import React, { useEffect, useRef, useState } from 'react';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Message from '../../messengers/user/Messsage/userMessage';
import './chat.css'
import io, { Socket } from "socket.io-client";
import { toast } from 'react-toastify';
import { findOnePartner } from '../../../features/axios/api/partner/partner';
import { findUser } from '../../../features/axios/api/user/user';
import { userInterface } from '../../../types/userInterface';
import { partnerDetailInterface } from '../../../types/partnerInterface';
import { useParams } from 'react-router-dom';
import { showCarInterface } from '../../../types/carAdminInterface';
import { getUserConversations, getUserMessages } from '../../../features/axios/api/messenger/userConversation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { conversationInterface } from '../../../types/messageInterface';
import { findAllCars } from '../../../features/axios/api/car/carAxios';
import { jwtDecode } from 'jwt-decode';
import { tokenInterface } from '../../../types/payloadInterface';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<conversationInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userData, setUserData] = useState<userInterface | null>(null);
  const [partnerData, setPartnerData] = useState<partnerDetailInterface | null>(null);
  const [car, setCar] = useState<showCarInterface | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
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

  useEffect(()=>{
    console.log("car details : ", car)
  }, [car])

  useEffect(() => {
    const socketConnection = io("http://localhost:5000/");
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      
      socket.emit("addUser", userID);
      socket.on("getUsers", (users: any) => {
        setCurrentUserSocketDetail(users);
      });

      socket.on("getMessage", async (data: any) => {
        
        
        const messageWithTimestamp = {
          ...data,
          createdAt: new Date().toISOString()
        };
        const existingMessages = await getUserMessages(partnerId!, userID!, 'partner');
        
        setMessages([...existingMessages, messageWithTimestamp]);
      });
    }
  }, [socket, partnerId, userID]);

  useEffect(() => {
    
      const fetchingMessages = async () => {
      
      const fetchMessages = await getUserMessages(partnerId!, userID!, 'partner');
      setMessages(fetchMessages);
    };
    fetchingMessages();
  }, [partnerId, userID]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!newMessage) return;
    socket?.emit("sendMessage", {
      senderId: userID,
      receiverId: partnerId,
      message: newMessage
    });

    const newMessageSave = await getUserConversations(partnerId!, userId!, newMessage);
    
    setNewMessage('');
    setMessages((prevMessages) => [...prevMessages, newMessageSave]);
    
  };

  return (
    <div className="container-fluid content-container">
      <div className="row">
        <div className="col-12 col-md-5 left-col">
          <div className="car-item mt-3 d-flex flex-column align-items-center">
            <div className="image-container d-flex justify-content-center align-items-center">
              <img src={car?.thumbnailImg} style={{ width: '50%', height: 'auto' }} alt={car?.name} />
            </div>
            <strong className="car-name mt-3">{car?.name}</strong>
            <div className="price-details text-center mt-3">
              <h4>Price per Day</h4>
              {<h5>Price: {car?.rentPricePerDay}</h5>}
            </div>
          </div>
        </div>
        <div className="col-7 right-col">
          <div className="chat-box me-3">
            <div className="d-flex justify-content-center align-items-center bg-dark text-light py-3 mb-1" style={{ height: '12px' }}>
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
