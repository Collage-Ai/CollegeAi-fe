// components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, List, message } from 'antd';
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
    //先查找是否有相同的userMsg，如果有，则使用新的消息替换掉旧的消息
    const index = chatList.findIndex((item) => item.userMsg === msg.userMsg);
    if (index !== -1) {
      setChatList((currentChatList: MessageArgs[]) => {
        currentChatList[index] = msg;
        return currentChatList;
      });
    } else {
      setChatList((currentChatList: MessageArgs[]) => [
        ...currentChatList,
        msg
      ]);
    }
    setChatList((currentChatList: MessageArgs[]) => [...currentChatList, msg]);
    sendMsgToServer(msg);
  };

  const sendMsgToGetAIResponse = (msg: MessageArgs) => {
    setIsLoading((isLoading) => !isLoading);
    setSelectValue(msg.userMsg);
    getAIResponse(msg.userMsg)
      .then((res) => {
        msg.aiMsg = res;
        updateChatList(msg);
        handleSelectChange(res);
      })
      .finally(() => {
        setIsLoading(false); // 无论请求成功还是失败，都将加载状态设置回false
      });
  };

  //当用户发送消息时，请求ai回答，并将消息显示在聊天框中，同时将消息发送到服务器
  const sendMessage = () => {
    if (message) {
      setMessage(''); // 清空输入框
      const msg: MessageArgs = {
        userId: user?.id,
        aiMsg: '',
        userMsg: message
      };
      sendMsgToGetAIResponse(msg);
    }
  };

  //重新发送消息
  const reSendMessage = () => {
    //查找chatList中最后一个消息
    const lastMsg = chatList[chatList.length - 1];
    if (lastMsg) {
      //删除最后一个消息
      console.log('lastMsg', lastMsg);
      sendMsgToGetAIResponse(lastMsg);
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
        <MessageItem message={selectedAiValue} isLoading={isLoading} />
      </div>
      <Flex gap="middle" align="flex-end" justify="flex-end">
        <Button type="primary" onClick={reSendMessage}>
          重新生成
        </Button>
        <Button type="primary" onClick={sendMessage}>
          归档
        </Button>
        <Button type="primary" onClick={sendMessage} disabled>
          分享
        </Button>
      </Flex>
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
