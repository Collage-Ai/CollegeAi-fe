// components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'antd';
import io from 'socket.io-client';

// 建立 socket 连接
const socket = io('ws:localhost:3000/chat');

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // 监听服务器发来的消息
    socket.on('receiveMessage', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('sendMessage', message); // 向服务器发送消息
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
