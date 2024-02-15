'use client';

// components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { Input, List } from 'antd';
import {
  Provider,
  useConnect,
  useDisconnect,
  useEmit,
  useListener,
  useMounted
} from 'use-socket.io-hooks';
import { Button } from '../button';

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const pushMessage = useEmit('sendMessage');

  // useEffect(() => {
  //   // 连接到服务器
  //   useConnect();

  //   // 监听服务器发来的消息
  //   useListener('sendMessage', (msg: string) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   // 组件卸载时断开连接
  //   return () => {
  //     useDisconnect();
  //   };
  // }, []);
  useListener('sendMessage', (msg: string) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  const sendMessage = () => {
    if (message) {
      pushMessage(message);
      setMessage(''); // 清空输入框
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Provider url="http://localhost:3000" />
      <List
        className="flex-1 overflow-auto"
        dataSource={messages}
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
        <Button onClick={sendMessage}>发送</Button>
      </div>
    </div>
  );
};

export default ChatComponent;
