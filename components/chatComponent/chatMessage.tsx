// components/MessageItem.tsx
import React from 'react';
import { MessageArgs } from '../../types/user';
import { OpenAIOutlined, UserOutlined } from '@ant-design/icons';
import TypewriterEffect from '../typeWriter';
import MarkdonwIt from 'markdown-it';
import { Spin } from 'antd';

interface MessageItemProps {
  message: string;
  isLoading: boolean;
}

//仅用于展示Ai消息
const MessageItem: React.FC<MessageItemProps> = ({ message, isLoading }) => {
  const md = new MarkdonwIt();
  const html = md.render(message);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className={`'justify-start' flex space-y-2`}>
      <div className="flex items-center">
        <div className="flex size-6 items-center justify-center rounded-full bg-slate-400">
          <OpenAIOutlined className="size-4 text-white" />
        </div>
      </div>
      <div
        className={`'bg-blue-100' max-w-[75%]
           rounded-xl p-2`}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export default MessageItem;
