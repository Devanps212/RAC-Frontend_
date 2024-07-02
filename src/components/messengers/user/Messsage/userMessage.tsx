import React from 'react';
import './userMessage.css';
import { conversationInterface } from '../../../../types/messageInterface';
import Skeleton from 'react-loading-skeleton';

interface MessageProps {
  message?: conversationInterface;
  own: boolean;
  profileImage?: string;
  loading?: boolean; 
}

const Message: React.FC<MessageProps> = ({ message, own, profileImage, loading }) => {
  const messageClass = own ? 'own' : 'receiver';

  if (loading) {
    return (
      <div className={`message-container ${messageClass}`}>
        <div className="message-bubble">
          <Skeleton width={200} height={20} />
          <Skeleton width={150} height={15} style={{ marginTop: '5px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`message-container ${messageClass}`}>
      <div className="message-bubble">
        {!own && profileImage && (
          <img src={profileImage} alt="Profile" className="profile-image" />
        )}
        <div className="message-content">
          <p className="message-text">{message?.message}</p>
        </div>
      </div>
      <div className="message-time">{message ? new Date(message.createdAt).toLocaleTimeString() : ''}</div>
    </div>
  );
};

export default Message;