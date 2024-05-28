// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchUser } from "../../features/redux/slices/user/userDetailsSlice";
// import { getUserConversations } from "../../features/axios/api/messenger/userConversation";
// import { postUserMessages } from "../../features/axios/api/messenger/userMessage";
// import { io, Socket } from "socket.io-client";
// import { getUserMessages } from "../../features/axios/api/messenger/userMessage";
// import UserHeader from "../../components/user/header/header";
// import Footer from "../../components/drivePartner/footer/footer";
// import Conversations from "../../components/messengers/user/userConservation";
// import { messageInterface } from "../../types/messageInterface";
// import { IoPaperPlaneSharp } from "react-icons/io5";
// import configKeys from "../../utils/api";
// import { toast } from "react-toastify";
// import { userInterface } from "../../types/userInterface";
// import { RootState } from "../../features/axios/redux/reducers/reducer";
// import { decodeToken } from "../../utils/tokenUtil";
// import { findOneUser } from "../../features/axios/api/admin/adminUser";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import Message from "../../components/messengers/user/userMessage";



// function Messenger() {
//   const dispatch = useDispatch();
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const socket = useRef<Socket | null>(null);
//   const user = useSelector((state: RootState) => state.token.token);
//   const [userData, setUserData] = useState<userInterface>()
//   const [conversations, setConversations] = useState<any[]>([]);
//   const [currentChat, setCurrentChat] = useState<any>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [arrivalMessage, setArrivalMessage] = useState<any>(null);
//   const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
//   const userToken = useSelector((root:RootState)=> root.token.token) ?? ''

//   useEffect(() => {
//     socket.current = io(configKeys.SOCKET_PORT);
//     socket.current.on("getMessage", (data : messageInterface) => {
//       setArrivalMessage({
//         sender: data?.senderId,
//         text: data?.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(()=>{
//     const findUser = async()=>{
//         const userId = await decodeToken(userToken).payload
//         const findUser = await findOneUser(userId)
//         console.log("findUser from data : ", findUser)
//         setUserData(findUser)
//     }
//     findUser()
//   }, [])
//   useEffect(() => {
//     if (arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender)) {
//       setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
//     }
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     if (userData && userData._id) {
//       socket.current?.emit("addUser", userData._id);
//       socket.current?.on("getUsers", (users : any) => {
//         setOnlineUsers(users);
//       });
//     }
//   }, [userData]);

// //   useEffect(() => {
// //     dispatch(fetchUser());
// //   }, [dispatch]);

//   useEffect(() => {
//     const getConversations = async () => {
//       if (userData) {
//         try {
//           const res = await getUserConversations(String(userData?._id));
//           setConversations(res);
//         } catch (error) {
//           console.log("Error fetching conversations:", error);
//         }
//       }
//     };
//     getConversations();
//   }, [userData]);

//   useEffect(() => {
//     const getMessages = async () => {
//       if (currentChat?._id) {
//         try {
//           const res = await getUserMessages(currentChat._id);
//           setMessages(res);
//         } catch (error) {
//           console.log("Error fetching messages:", error);
//         }
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const message = {
//       conversationId: currentChat?._id,
//       sender: userData?._id,
//       text: newMessage,
//     };

//     const receiverId = currentChat?.members?.find((member: any) => member !== userData?._id);

//     socket.current?.emit("sendMessage", {
//       senderId: userData?._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await postUserMessages(message);
//       setMessages([...messages, res]);
//       setNewMessage("");
//     } catch (error) {
//       toast.error("Failed to send message");
//       console.log("Error sending message:", error);
//     }
//   };

//   return (
//     <div>
//       <UserHeader />
//       <div className="pt-5 pb-5 h-screen d-flex mx-auto container mt-4 rounded">
//         <div className="flex-auto p-3">
//           <div>
//             <input
//               className="form-control p-3 border-bottom border-gray-500 focus:outline-none"
//               placeholder="Search User"
//               type="text"
//             />
//             <div className="overflow-auto" style={{ height: '24rem' }}>
//               {conversations.map((c, index) => (
//                 <div onClick={() => setCurrentChat(c)} key={index}>
//                   <Conversations conversation={c} currentUser={userData} onlineUsers={onlineUsers} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex-auto p-3 w-64">
//           <div className="d-flex flex-column justify-content-between h-100 position-relative">
//             {currentChat ? (
//               <>
//                 <div className="pr-2 h-100 overflow-auto">
//                   {messages.map((msg, index) => (
//                     <div key={index} ref={scrollRef}>
//                       <Message message={msg} own={msg.sender === userData?._id} id={msg.sender} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-2 d-flex align-items-center justify-content-between">
//                   <textarea
//                     className="form-control w-100 h-24 p-3 focus:outline-none"
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Write something..."
//                     value={newMessage}
//                   />
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={<Tooltip id={`tooltip-top`}>Send</Tooltip>}
//                   >
//                     <button onClick={()=>handleSubmit} className="btn btn-link text-primary">
//                       <IoPaperPlaneSharp size={30} />
//                     </button>
//                   </OverlayTrigger>
//                 </div>
//               </>
//             ) : (
//               <span className="position-absolute top-50 start-50 translate-middle text-muted" style={{ fontSize: '2rem' }}>
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex-auto p-3"></div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Messenger;
