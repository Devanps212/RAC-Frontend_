import React, { useEffect, useRef, useState } from 'react';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Message from '../../messengers/user/Messsage/userMessage';
import './partnerNegotiation.css';
import { toast } from 'react-toastify';
import { findOnePartner } from '../../../features/axios/api/partner/partner';
import { partnerDetailInterface } from '../../../types/partnerInterface';
import ChatSidebar from '../../commonComponent/chatSidebar/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/axios/redux/reducers/reducer';
import { jwtDecode } from 'jwt-decode';
import { tokenInterface } from '../../../types/payloadInterface';
import { findUsersforConversation } from '../../../features/axios/api/user/user';
import { userInterface } from '../../../types/userInterface';
import { getUserConversations, getUserMessages } from '../../../features/axios/api/messenger/userConversation';
import { conversationInterface } from '../../../types/messageInterface';
import { useSocketContext } from '../../../context/socketContext';

const PartnerNegotiate: React.FC = () => {
  const { userSocket, partnerSocket, onlineUsers } = useSocketContext();
  const [messages, setMessages] = useState<conversationInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [partnerData, setPartnerData] = useState<partnerDetailInterface | null>(null);
  const [conversationUsers, setConversationUsers] = useState<userInterface[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const partnerToken = useSelector((state: RootState) => state.partnerToken.partnerToken) ?? '';
  const decoded: tokenInterface = jwtDecode(partnerToken);
  const partnerId = decoded.payload;

  useEffect(() => {
    const findPartnerDetail = async () => {
      try {
        const findPartner = await findOnePartner(partnerId as string);
        setPartnerData(findPartner);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    findPartnerDetail();
  }, [partnerId]);

  useEffect(() => {
    const findUser = async () => {
      try {
        const users = await findUsersforConversation(partnerId);
        setConversationUsers(users);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    findUser();
  }, [partnerId]);

  useEffect(() => {
    const handleNewMessage = (newMessage: conversationInterface) => {
      console.log("new Message :", newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    userSocket?.on('newMessage', handleNewMessage);
    partnerSocket?.on('newMessage', handleNewMessage);

    return () => {
      userSocket?.off('newMessage', handleNewMessage);
      partnerSocket?.off('newMessage', handleNewMessage);
    };
  }, [userSocket, partnerSocket]);

  useEffect(() => {
    if (partnerId) {
      userSocket?.emit('addUser', partnerId);
      partnerSocket?.emit('addUser', partnerId);
    }
  }, [partnerId, userSocket, partnerSocket]);

  const handleContactSelection = async (userId: string) => {
    setSelectedUserId(userId);
    console.log(`Selected user id: ${userId}`); // Debug log
    try {
      const userMessages = await getUserMessages(userId, 'user');
      setMessages(userMessages);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUserId || !newMessage.trim()) return;

    console.log(`Sending message to user id: ${selectedUserId}`); // Debug log
    try {
      const savedMessage = await getUserConversations(selectedUserId, partnerId, newMessage);
      userSocket?.emit('sendMessage', savedMessage);
      partnerSocket?.emit('sendMessage', savedMessage);
      setNewMessage('');
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid content-container">
      <div className="row">
        <div className="col-md-3">
          <ChatSidebar users={conversationUsers} onSelectContact={handleContactSelection} selectedUserId={selectedUserId} />
        </div>
        <div className="col-md-9">
          <div className="chat-box me-3">
            <h4 className="ms-5 text-light">Chat here</h4>
            <div className="message-list">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                    <Message message={msg} own={msg.senderId === partnerId} />
                  </div>
                ))
              ) : (
                <p className="text-light ms-5">No messages yet. Start a conversation!</p>
              )}
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

export default PartnerNegotiate;
