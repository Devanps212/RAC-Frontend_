import React, { useEffect, useRef, useState } from 'react';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Message from '../../messengers/user/Messsage/userMessage';
import './partnerChat.css';
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
import io, { Socket } from 'socket.io-client';

const PartnerNegotiate: React.FC = () => {
  const [messages, setMessages] = useState<conversationInterface[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [partnerData, setPartnerData] = useState<partnerDetailInterface | null>(null);
  const [conversationUsers, setConversationUsers] = useState<userInterface[]>([]);
  const [unreadMessageCounts, setUnreadMessageCounts] = useState<{ [userId: string]: number }>({});
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentPartnerSocketDetail, setCurrentPartnerSocketDetail] = useState<any>(null);
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
    const socketConnection = io("http://localhost:5000/");
    setSocket(socketConnection);
    
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", partnerId);

      socket.on("getUsers", (users: any) => {
        setCurrentPartnerSocketDetail(users);
      });

      socket.on("getMessage", async (data: any) => {
        if (selectedUserId === data.senderId) {
          const messageWithTimestamp = {
            ...data,
            createdAt: new Date().toISOString()
          };
          const userMessages = await getUserMessages(selectedUserId!, partnerId, 'user');
          
          setMessages([...userMessages, messageWithTimestamp]);
        } else {
          setUnreadMessageCounts((prevCounts) => ({
            ...prevCounts,
            [data.senderId]: (prevCounts[data.senderId] || 0) + 1,
          }));
        }
      });

      return () => {
        socket.off("getUsers");
        socket.off("getMessage");
      };
    }
  }, [socket, partnerId, selectedUserId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleContactSelection = async (userId: string) => {
    setSelectedUserId(userId);
    try {
      const userMessages = await getUserMessages(userId, partnerId, 'user');
      setMessages(userMessages);
      setUnreadMessageCounts((prevCounts) => ({
        ...prevCounts,
        [userId]: 0,
      }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage || !selectedUserId) {
      return;
    }

    socket?.emit("sendMessage", {
      senderId: partnerId,
      receiverId: selectedUserId,
      message: newMessage,
    });

    const savedMessage = await getUserConversations(selectedUserId, partnerId, newMessage);
    setNewMessage('');
    setMessages((prevMessages) => [...prevMessages, savedMessage]);
  };

  const getProfileImage = (userId: string) => {
    const user = conversationUsers.find(user => user._id?.toString() === userId);
    return user?.profilePic;
  };

  return (
    <div className="container-fluid content-container">
      <div className="row">
        <div className="col-md-3">
          <ChatSidebar users={conversationUsers} unreadMessageCounts={unreadMessageCounts} onSelectContact={handleContactSelection} selectedUserId={selectedUserId} />
        </div>
        <div className="col-md-9">
          <div className="chat-box me-3">
            <h4 className="ms-5 text-light">Chat here</h4>
            <div className="message-list">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                    <Message message={msg} own={msg.senderId === partnerId} profileImage={getProfileImage(msg.senderId)} />
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
