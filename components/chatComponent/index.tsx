// components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'antd';
import io from 'socket.io-client';
import { MessageArgs, UserBaseInfo } from '../../types/user';
import { useChatStore, useUserStore } from '@/store/userStore';
import { sendMsgToServer } from '@/utils/fetcher';
import { getAIResponse } from '@/utils/ai';

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const { chatList, setChatList } = useChatStore();
  const { user } = useUserStore();

  //当用户发送消息时，请求ai回答，并将消息显示在聊天框中，同时将消息发送到服务器
  const sendMessage = () => {
    const msg: MessageArgs = { userId: user?.id, message, sender: 'user' };
    if (message) {
      setChatList([...chatList, msg]);
      getAIResponse(message).then((res) => {
        const aiMsg: MessageArgs = {
          userId: user?.id,
          message: res,
          sender: 'ai'
        };
        setChatList([...chatList, aiMsg]);
      });
      sendMsgToServer(msg);
      setMessage(''); // 清空输入框
    }
  };

  return (
    <div className="flex h-full flex-col">
      <List
        className="flex-1 overflow-auto"
        dataSource={chatList.map((item) => item.message)}
        renderItem={(item) => (
          <List.Item>
            <div className="message rounded bg-blue-100 p-2">{item}</div>
          </List.Item>
        )}
      />
      <div className="flex p-4">
        <Input
          className="mr-2 flex-1"
          placeholder="输入消息..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button type="primary" onClick={sendMessage}>
          发送
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
