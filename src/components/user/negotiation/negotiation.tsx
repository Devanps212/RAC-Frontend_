import React, { useEffect, useRef, useState } from 'react';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Message from '../../messengers/user/Messsage/userMessage';
import './negotiation.css';
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
import { useSocketContext } from '../../../context/socketContext';
import { Socket } from 'socket.io-client';

const Chat = () => {
  const sockets = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<conversationInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userData, setUserData] = useState<userInterface>();
  const [partnerData, setPartnerData] = useState<partnerDetailInterface>();
  const [car, setCar] = useState<showCarInterface>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { userId, partnerId, carId } = useParams();
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((root: RootState) => root.token.token) ?? '';
  const { onlineUsers, socket } = useSocketContext();
  const isOnline = onlineUsers.includes(partnerId as string);

  useEffect(() => {
    const findPartnerDetail = async () => {
      try {
        const findPartner = await findOnePartner(partnerId as string);
        setPartnerData(findPartner);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const findingUser = async () => {
      try {
        const findUsers = await findUser(userId as string);
        setUserData(findUsers.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const findCar = async () => {
      try {
        const findCar = await findAllCars(carId as string, 'user');
        setCar(findCar);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const getMessage = async () => {
      try {
        setLoading(true);
        const userMessages = await getUserMessages(partnerId as string);
        setMessages(userMessages);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    findPartnerDetail();
    findingUser();
    findCar();
    getMessage();
  }, [userId, partnerId, carId]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const handleMessage = (newMessage: conversationInterface) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleMessage);

    return () => {
      socket?.off("newMessage", handleMessage);
    };
  }, [socket]);

  const sendNewMessage = async (messageText: string) => {
    try {
      const newMessage = await getUserConversations(partnerId as string, userToken, messageText);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage) return;
    await sendNewMessage(newMessage);
    setNewMessage('');
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
              <h4>Current Price</h4>
              {car && car.offer ? <p>Price: {car.offer.price}</p> : <p>Price: {car?.rentPricePerDay}</p>}
              <strong>Negotiated Price: <span>1100000</span></strong>
            </div>
          </div>
        </div>
        <div className="col-7 right-col">
          <div className="chat-box me-3">
            <div className="d-flex justify-content-center align-items-center bg-dark text-light py-3 mb-1" style={{ height: '12px' }}>
              <h4 className="ms-5 mb-0">{`Connected to: ${partnerData?.name || "Unknown"}`}</h4>
              {isOnline ? (
                <span className="badge bg-success ms-2">Online</span>
              ) : (
                <span className="badge bg-danger ms-2">Offline</span>
              )}
            </div>

            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} ref={scrollRef}>
                  <Message message={msg} own={msg.senderId === userId} profileImage={userData?.profilePic || ''} loading={loading} />
                </div>
              ))}
            </div>
            <form className="message-input" onSubmit={handleSubmit}>
              <textarea
                className="form-control message-textarea"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">Send</Tooltip>}>
                <button type="submit" className="btn btn-primary send-button">
                  <IoPaperPlaneSharp size={24} />
                </button>
              </OverlayTrigger>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
