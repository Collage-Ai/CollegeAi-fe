// components/MessageItem.tsx
import React from 'react';
import { MessageArgs } from '../../types/user';
import { OpenAIOutlined, UserOutlined } from '@ant-design/icons';
import TypewriterEffect from '../typeWriter';

interface MessageItemProps {
  message: MessageArgs;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';

  return (
    <div
      className={`flex ${
        isUserMessage ? 'justify-start' : 'justify-end'
      }  space-y-2`}
    >
      {isUserMessage && (
        <div className="flex items-center">
          <div className="flex size-6 items-center justify-center rounded-full bg-slate-400">
            <UserOutlined className="size-4 text-white" />
          </div>
        </div>
      )}

      <div
        className={`rounded-xl p-2 ${
          isUserMessage ? 'bg-blue-100' : 'bg-gray-100'
        } max-w-[75%]`}
      >
        <div>
          <TypewriterEffect message={message.message} />
        </div>
      </div>
      {!isUserMessage && (
        <div className="flex items-center">
          <div className="flex size-6 items-center justify-center rounded-full bg-slate-400">
            <OpenAIOutlined className="size-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
