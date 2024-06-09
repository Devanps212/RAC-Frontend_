import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from "react";
import io, { Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../features/axios/redux/reducers/reducer";
import { tokenInterface } from "../types/payloadInterface";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}
 
const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
}

const SocketContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const userToken = useSelector((state: RootState) => state.token.token) ?? '';
  const partnerToken = useSelector((state: RootState) => state.partnerToken.partnerToken) ?? '';

  useEffect(() => {
    const connectSocket = (token: string, role: string): Socket => {
      try {
        const decodedToken = jwtDecode<tokenInterface>(token);
        const senderId = decodedToken.payload

        const newSocket = io("http://localhost:5000/", {
          query: {
            senderId,
            role,
          },
        });

        newSocket.on('connect', () => {
          console.log(`Socket connected with ID: ${newSocket.id}`);
        });

        newSocket.on('getOnlineUsers', (users: any) => {
          setOnlineUsers(users);
        });

        return newSocket;
      } catch (error) {
        console.error('Failed to decode token:', error);
        throw error; // You may want to handle this error case
      }
    };

    // Connect socket based on the available token (user or partner)
    if (userToken && partnerToken) {
      console.log("Both userToken and partnerToken are present. Handling both.");
      const userSocket = connectSocket(userToken, 'user');
      const partnerSocket = connectSocket(partnerToken, 'partner');

      setSocket(userSocket);

      return () => {
        userSocket.close();
        partnerSocket.close();
      };
    } else if (userToken) {
      console.log("Found userToken:", userToken);
      const userSocket = connectSocket(userToken, 'user');
      setSocket(userSocket);

      return () => userSocket.close();
    } else if (partnerToken) {
      console.log("Found partnerToken:", partnerToken);
      const partnerSocket = connectSocket(partnerToken, 'partner');
      setSocket(partnerSocket);

      return () => partnerSocket.close();
    } else {

      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      socket?.close();
    };
  }, [userToken, partnerToken]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
