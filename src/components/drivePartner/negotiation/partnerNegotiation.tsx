import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Message from '../../messengers/user/Messsage/userMessage';
import './partnerNegotiation.css';
import { toast } from 'react-toastify';
import { findOnePartner } from '../../../features/axios/api/partner/partner';
import { findOneUser } from '../../../features/axios/api/admin/adminUser';
import { userInterface } from '../../../types/userInterface';
import { partnerDetailInterface } from '../../../types/partnerInterface';
import { useParams } from 'react-router-dom';
import { carBasedOnRole, findAllCars } from '../../../features/axios/api/car/carAxios';
import { showCarInterface } from '../../../types/carAdminInterface';

interface ChatProps {
  userId: string;
  partnerId: string;
  carId: string;
}

const PartnerChat: React.FC<ChatProps> = ({ userId, partnerId, carId }) => {
  const socket = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [userData, setUserData] = useState<userInterface>();
  const [partnerData, setPartnerData] = useState<partnerDetailInterface>();
  const [car, setCar] = useState<showCarInterface>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const findPartnerDetail = async () => {
      try {
        const findPartner = await findOnePartner(partnerId);
        setPartnerData(findPartner);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const findUser = async () => {
      try {
        const findUser = await findOneUser(userId);
        setUserData(findUser.user);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const findCar = async () => {
      try {
        const findcar = await findAllCars(carId, 'user');
        setCar(findcar);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    findPartnerDetail();
    findUser();
    findCar();
  }, [userId, partnerId, carId]);

  useEffect(() => {
    socket.current = io('http://localhost:5000/');
    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (partnerId) {
      socket.current?.emit('addUser', partnerId);
    }
  }, [partnerId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      senderId: partnerId,
      receiverId: userId,
      text: newMessage,
    };

    socket.current?.emit('sendMessage', message);

    setMessages([...messages, { ...message, createdAt: Date.now() }]);
    setNewMessage('');
  };

  return (
    <div className="container-fluid content-container">
      <div className="row">
        <div className="col-12 col-md-5 left-col">
          <div className="car-item mt-3 d-flex flex-column align-items-center">
            <div className="image-container d-flex justify-content-center align-items-center">
              <img 
                src={car?.thumbnailImg} 
                style={{ width: '50%', height: 'auto' }} 
                alt={car?.name}
              />
            </div>
            <strong className="car-name mt-3">{car?.name}</strong>
            <div className="price-details text-center mt-3">
              <h4>Current Price</h4>
              {car && car.offer ? (
                <p>Price: {car.offer.price}</p>
              ) : (
                <p>Price: {car?.rentPricePerDay}</p>
              )}
              <strong>Negotiated Price: <span>1100000</span></strong>
            </div>
          </div>
        </div>
        <div className="col-7 right-col">
          <div className="chat-box me-3">
            <h4 className="ms-5 text-light">Chat here</h4>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} ref={scrollRef}>
                  <Message message={msg} own={msg.senderId === partnerId} />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="message-input">
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

export default PartnerChat;
