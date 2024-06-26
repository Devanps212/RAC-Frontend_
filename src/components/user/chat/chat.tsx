import React, { useEffect, useRef, useState } from 'react';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import Message from '../../messengers/user/Messsage/userMessage';
import './chat.css';
import { io, Socket } from "socket.io-client";
import { toast } from 'react-toastify';
import { findOnePartner } from '../../../features/axios/api/partner/partner';
import { findUser } from '../../../features/axios/api/user/user';
import { useParams } from 'react-router-dom';
import { findAllCars } from '../../../features/axios/api/car/carAxios';
import { getUserConversations, getUserMessages } from '../../../features/axios/api/messenger/userConversation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { jwtDecode } from 'jwt-decode';
import { conversationInterface } from '../../../types/messageInterface';
import { showCarInterface } from '../../../types/carAdminInterface';
import { userInterface } from '../../../types/userInterface';
import { partnerDetailInterface } from '../../../types/partnerInterface';
import { tokenInterface } from '../../../types/payloadInterface';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<conversationInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userData, setUserData] = useState<userInterface | null>(null);
  const [partnerData, setPartnerData] = useState<partnerDetailInterface | null>(null);
  const [car, setCar] = useState<showCarInterface | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const { userId, partnerId, carId } = useParams<{ userId: string; partnerId: string; carId: string }>();
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((root: RootState) => root.token.token) ?? '';
  const decodeToken: tokenInterface = jwtDecode(userToken);
  const userID = decodeToken.payload;
  const [currentUserSocketDetail, setCurrentUserSocketDetail] = useState<any>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [partnerDetails, userDetails, carDetails] = await Promise.all([
          findOnePartner(partnerId!),
          findUser(userId!),
          findAllCars(carId!, 'user'),
        ]);

        setPartnerData(partnerDetails);
        setUserData(userDetails.data);
        setCar(carDetails);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchInitialData();
  }, [userId, partnerId, carId]);

  useEffect(() => {
    try {
      console.log("Attempting to connect to:", import.meta.env.VITE_BACKEND_SERVER);
      const socketConnection = io('https://easyrentacar.shop');
      console.log("Socket connection established:", socketConnection);

      socketRef.current = socketConnection;

      socketConnection.on('connect', () => {
        console.log('Socket connected successfully');
      });

      socketConnection.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });

      socketConnection.on('error', (error) => {
        console.error('Socket connection error:', error);
      });

      socketConnection.emit("addUser", userID);

      socketConnection.on("getUsers", (users) => {
        console.log("getUsers event called with users:", users);
        setCurrentUserSocketDetail(users);
      });

      socketConnection.on("getMessage", (data) => {
        console.log("getMessage event called with data:", data);
        const messageWithTimestamp = {
          ...data,
          createdAt: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
      });

      return () => {
        console.log("Cleaning up socket event listeners");
        socketConnection.off("getUsers");
        socketConnection.off("getMessage");
        socketConnection.disconnect();
      };
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  }, [userID]);


  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getUserMessages(partnerId!, userID!, 'partner');
      setMessages(messages);
    };
    fetchMessages();
  }, [partnerId, userID]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage) return;

    socketRef.current?.emit("sendMessage", {
      senderId: userID,
      receiverId: partnerId,
      message: newMessage,
    });

    const newMessageSave = await getUserConversations(partnerId!, userId!, newMessage);

    setNewMessage('');
    // setMessages((prevMessages) => [...prevMessages, newMessageSave]);
  };

  return (
    <div className="container-fluid content-container">
      <div className="row" style={{marginTop:'5.5rem'}}>
        <div className="col-12 col-md-3 left-col">
          <div className="car-item mt-3">
            <div className="image-container">
              <img src={car?.thumbnailImg} alt={car?.name} />
            </div>
            <strong className="car-name mt-3">{car?.name}</strong>
            <div className="price-details mt-3">
              <h4>Price per Day</h4>
              <h5>Price: {car?.rentPricePerDay}</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9 right-col">
          <div className="chat-box">
            <div className="d-flex justify-content-center align-items-center bg-dark text-light py-3">
              <h4 className="ms-5 mb-0">{`Connected to: ${partnerData?.name || "Unknown"}`}</h4>
            </div>

            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                  <Message message={msg} own={msg.senderId === userId} profileImage={partnerData?.profilePic || ''} loading={loading} />
                </div>
              ))}
            </div>
            <form className="message-input" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit" className="btn btn-primary">
                <IoPaperPlaneSharp />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
