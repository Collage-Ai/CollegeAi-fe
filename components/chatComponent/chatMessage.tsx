// components/MessageItem.tsx
import React from 'react';
import { MessageArgs } from '../../types/user';
import { OpenAIOutlined, UserOutlined } from '@ant-design/icons';

interface MessageItemProps {
  message: MessageArgs;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';

  return (
    <div
      className={`flex ${
        isUserMessage ? 'justify-start' : 'justify-end'
      } flex-col`}
    >
      {isUserMessage && (
        <div className="avatar mr-2 w-[24px] rounded-xl bg-slate-400 blur-sm">
          <UserOutlined />
        </div>
      )}
      {!isUserMessage && (
        <div className="avatar mr-2 max-w-[24px] bg-slate-400">
          <OpenAIOutlined />
        </div>
      )}
      <div
        className={`message rounded p-2 ${
          isUserMessage ? 'bg-blue-100' : 'bg-gray-100'
        } max-w-[75%]`}
      >
        <div>{message.message}</div>
      </div>
    </div>
  );
};

export default MessageItem;
