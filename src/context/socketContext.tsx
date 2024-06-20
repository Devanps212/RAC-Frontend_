// import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from "react";
// import io, { Socket } from "socket.io-client";
// import { jwtDecode } from "jwt-decode";
// import { useSelector } from "react-redux";
// import { RootState } from "../features/axios/redux/reducers/reducer";
// import { tokenInterface } from "../types/payloadInterface";

// interface SocketContextType {
//   userSocket: Socket | null;
//   partnerSocket: Socket | null;
//   onlineUsers: string[];
// }

// const SocketContext = createContext<SocketContextType>({
//   userSocket: null,
//   partnerSocket: null,
//   onlineUsers: [],
// });

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// }

// const SocketContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [userSocket, setUserSocket] = useState<Socket | null>(null);
//   const [partnerSocket, setPartnerSocket] = useState<Socket | null>(null);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const userToken = useSelector((state: RootState) => state.token.token) ?? '';
//   const partnerToken = useSelector((state: RootState) => state.partnerToken.partnerToken) ?? '';

//   useEffect(() => {
//     const connectSocket = (token: string, role: string): Socket => {
//       try {
//         const decodedToken = jwtDecode<tokenInterface>(token);
//         const senderId = decodedToken.payload;

//         const newSocket = io("http://localhost:5000/", {
//           query: {
//             senderId,
//             role,
//           },
//         });

//         newSocket.on('connect', () => {
//           console.log(`Socket connected with ID: ${newSocket.id}`);
//         });

//         newSocket.on('getOnlineUsers', (users: any) => {
//           setOnlineUsers(users);
//         });

//         return newSocket;
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//         throw error;
//       }
//     };

//     if (userToken && partnerToken) {
//       console.log("Both userToken and partnerToken are present. Handling both.");
//       const userSocketInstance = connectSocket(userToken, 'user');
//       const partnerSocketInstance = connectSocket(partnerToken, 'partner');

//       setUserSocket(userSocketInstance);
//       setPartnerSocket(partnerSocketInstance);

//       return () => {
//         userSocketInstance.close();
//         partnerSocketInstance.close();
//       };
//     } else if (userToken) {
//       console.log("Found userToken:", userToken);
//       const userSocketInstance = connectSocket(userToken, 'user');
//       setUserSocket(userSocketInstance);

//       return () => userSocketInstance.close();
//     } else if (partnerToken) {
//       console.log("Found partnerToken:", partnerToken);
//       const partnerSocketInstance = connectSocket(partnerToken, 'partner');
//       setPartnerSocket(partnerSocketInstance);

//       return () => partnerSocketInstance.close();
//     } else {
//       if (userSocket) {
//         userSocket.close();
//         setUserSocket(null);
//       }
//       if (partnerSocket) {
//         partnerSocket.close();
//         setPartnerSocket(null);
//       }
//     }

//     return () => {
//       userSocket?.close();
//       partnerSocket?.close();
//     };
//   }, [userToken, partnerToken]);

//   return (
//     <SocketContext.Provider value={{ userSocket, partnerSocket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketContextProvider;
