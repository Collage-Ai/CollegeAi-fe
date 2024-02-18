// components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'antd';
import { MessageArgs } from '../../types/user';
import { useChatStore, useUserStore } from '@/store/userStore';
import { sendMsgToServer } from '@/utils/fetcher';
import { getAIResponse } from '@/utils/ai';
import MessageItem from './chatMessage';
import { set } from 'nprogress';
import SelectPrompt from '../selectPrompt';

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const { chatList, setChatList } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAiValue, setSelectedAiValue] = useState('');
  const [selectValue, setSelectValue] = useState('请选择');
  const { user } = useUserStore();

  const handleSelectChange = (value: string) => {
    setSelectedAiValue(value);
  };

  //更新聊天记录，并发送消息到服务器
  const updateChatList = (msg: MessageArgs) => {
    setChatList((currentChatList: MessageArgs[]) => [...currentChatList, msg]);
    console.log(user?.id);
    sendMsgToServer(msg);
  };

  //当用户发送消息时，请求ai回答，并将消息显示在聊天框中，同时将消息发送到服务器
  const sendMessage = () => {
    if (message) {
      setIsLoading((isLoading) => !isLoading);
      setMessage(''); // 清空输入框
      setSelectValue(message);
      getAIResponse(message)
        .then((res) => {
          const msg: MessageArgs = {
            userId: user?.id,
            aiMsg: res,
            userMsg: message
          };
          updateChatList(msg);
          handleSelectChange(res);
        })
        .finally(() => {
          setIsLoading(false); // 无论请求成功还是失败，都将加载状态设置回false
        });
    }
  };

  return (
    <div className="flex h-full w-[40vw] flex-col">
      <SelectPrompt
        item={chatList}
        onSelectChange={handleSelectChange}
        value={selectValue}
      />
      {/* <List
        className="flex-1 overflow-auto"
        dataSource={chatList}
        renderItem={(item) => <MessageItem message={item} />}
      /> */}
      <div className="flex-1 overflow-auto">
        <MessageItem message={selectedAiValue} />
      </div>
      <div className="flex p-4">
        <Input
          className="mr-2 flex-1"
          placeholder="输入消息..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
        />
        {isLoading ? (
          <Button type="dashed" onClick={sendMessage}>
            加载中
          </Button>
        ) : (
          <Button type="primary" onClick={sendMessage}>
            发送
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
