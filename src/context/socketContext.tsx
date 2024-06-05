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
    const connectSocket = (token: string) => {
      try {
        const decodedToken = jwtDecode<tokenInterface>(token);
        const userId = decodedToken.payload

        const socket = io("http://localhost:5000/", {
          query: {
            userId,
          },
        });

        setSocket(socket);

        socket.on('getOnlineUsers', (users: any) => {
          setOnlineUsers(users);
        });

      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    };

    // Connect socket based on the available token (user or partner)
    if (userToken) {
      console.log("found userToken : ", userToken)
      connectSocket(userToken);
    } else if (partnerToken) {
      console.log("found partner token : ", partnerToken)
      connectSocket(partnerToken);
    } else {
      // Close socket if neither token is present
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
