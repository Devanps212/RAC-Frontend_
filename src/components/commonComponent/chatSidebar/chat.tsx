import React from 'react';
import { userInterface } from '../../../types/userInterface';
import { FaUserCircle } from 'react-icons/fa';
import './chat.css';

interface ChatSidebarProps {
  users?: userInterface[] | userInterface;
  unreadMessageCounts: { [userId: string]: number };
  onSelectContact: (id: string) => void;
  selectedUserId: string | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ users, unreadMessageCounts, onSelectContact, selectedUserId }) => {
  
  return (
    <div className="chat-sidebar">
      <h2>Chats</h2>
      <ul>
        {Array.isArray(users) ? (
          users.map((contact) => (
            <li
              key={contact._id?.toString()}
              onClick={() => onSelectContact(contact._id?.toString() ?? '')}
              className={selectedUserId === contact._id?.toString() ? 'selected' : ''}
            >
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
                  {unreadMessageCounts[contact._id?.toString() ?? ''] > 0 && (
                    <div className="unread-count">{unreadMessageCounts[contact._id?.toString() ?? '']}</div>
                  )}
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
