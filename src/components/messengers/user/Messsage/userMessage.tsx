import React from 'react';
import './userMessage.css';

interface MessageProps {
  message: {
    senderId: string;
    text: string;
    createdAt: number;
  };
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ message, own }) => {
  return (
    <div className={`message ${own ? 'own' : ''}`}>
      <div className="message-top">
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{new Date(message.createdAt).toLocaleTimeString()}</div>
    </div>
  );
};

export default Message;
