// components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'antd';
import {
  useConnect,
  useDisconnect,
  useEmit,
  useListener,
  useMounted
} from 'use-socket.io-hooks';

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const pushMessage = useEmit('sendMessage');

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
        <Button type="primary" onClick={sendMessage}>
          发送
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
