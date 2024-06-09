import React from 'react';
import { userInterface } from '../../../types/userInterface';
import { FaUserCircle } from 'react-icons/fa'; // Icon for users without a profile picture
import './chat.css';

interface ChatSidebarProps {
  users?: userInterface[] | userInterface;
  onSelectContact: (id: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ users, onSelectContact }) => {
  return (
    <div className="chat-sidebar">
      <h2>Chats</h2>
      <ul>
        {Array.isArray(users) ? (
          users.map((contact) => (
            <li key={contact._id?.toString()} onClick={() => onSelectContact(contact._id?.toString() ?? '')}>
              <div className="contact-item">
                <div className="profile-pic">
                  {contact.profilePic ? (
                    <img src={contact.profilePic} alt="Profile" />
                  ) : (
                    <FaUserCircle size={40} />
                  )}
                </div>
                <div className="contact-details">
                  <div className="contact-name">{contact.name}</div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No users available</li>
        )}
      </ul>
    </div>
  );
};

export default ChatSidebar;
