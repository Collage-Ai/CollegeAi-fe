// components/MessageItem.tsx
import React from 'react';
import { MessageArgs } from '../../types/user';
import AiIcon from '../icons/bot.svg';

interface MessageItemProps {
  message: MessageArgs;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';

  return (
    <div className={`flex ${isUserMessage ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`message rounded p-2 ${
          isUserMessage ? 'bg-blue-100' : 'bg-gray-100'
        }`}
      >
        {isUserMessage && <div className="avatar mr-2">👤</div>}
        <div>{message.message}</div>
        {!isUserMessage && (
          <div className="avatar ml-2">
            <AiIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
