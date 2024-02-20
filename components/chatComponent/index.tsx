'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { MessageArgs } from '../../types/user';
import { useChatStore, useUserStore } from '@/store/userStore';
import { getChatHistory, sendMsgToServer } from '@/utils/fetcher';
import { getAIResponse } from '@/utils/ai';
import MessageItem from './chatMessage';
import SelectPrompt from '../selectPrompt';
import ModalCategory from '../modal/modalCategory';
import { useStateCallback } from '@/utils/hook';

type ChatComponentProps = {
  type: 'insight' | 'skill';
  search?: string;
};

const ChatComponent = ({ type, search }: ChatComponentProps) => {
  const [message, setMessage] = useState('');
  const { chatList, setChatList, replaceChatList } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAiValue, setSelectedAiValue] = useState('');
  const [selectValue, setSelectValue] = useStateCallback('请选择');
  const [category, setCategory] = useStateCallback([]); // 用于存储归档的类别
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

  const handleSelectValue = (value: string) => {
    setSelectValue(value);
    setSelectedAiValue(value);
  };
  //更新聊天记录，并发送消息到服务器 todo:筛选发送后端的消息
  const updateChatList = useCallback(
    async (msg: MessageArgs) => {
      const data = await sendMsgToServer(msg);
      if (data) {
        //先查找是否有相同的userMsg，如果有，则使用新的消息替换掉旧的消息
        const index = chatList.findIndex(
          (item) => item.userMsg === data.userMsg
        );
        if (index !== -1) {
          setChatList((currentChatList: MessageArgs[]) => {
            currentChatList[index] = data;
            return currentChatList;
          });
        } else
          setChatList((currentChatList: MessageArgs[]) => [
            ...currentChatList,
            data
          ]);
      }
    },
    [chatList, setChatList]
  );

  const sendMsgToGetAIResponse = useCallback(
    (msg: MessageArgs) => {
      setIsLoading((isLoading) => !isLoading);
      setSelectValue(msg.userMsg);
      getAIResponse(msg.userMsg)
        .then((res) => {
          msg.aiMsg = res;
          updateChatList(msg);
          setSelectedAiValue(res);
        })
        .finally(() => {
          setIsLoading(false); // 无论请求成功还是失败，都将加载状态设置回false
        });
    },
    [setSelectValue, updateChatList]
  );

  //当用户发送消息时，请求ai回答，并将消息显示在聊天框中，同时将消息发送到服务器
  const sendMessage = () => {
    if (message) {
      setMessage(''); // 清空输入框
      const msg: MessageArgs = {
        userId: user?.id,
        aiMsg: '',
        userMsg: message,
        type: type
      };
      sendMsgToGetAIResponse(msg);
    }
  };

  //重新发送消息
  const reSendMessage = () => {
    const lastMsg = chatList[chatList.length - 1];
    if (lastMsg) {
      sendMsgToGetAIResponse(lastMsg);
    }
  };

  const setChatCategory = () => {
    //设置当前消息的类别
    const msg = chatList[chatList.length - 1];
    msg.category = Number(category[1]);
    updateChatList(msg);
    setOpen(false);
  };

  const setChatHistory = useCallback(() => {
    getChatHistory().then((res) => {
      if (res) {
        replaceChatList(res);
      }
    });
  }, [replaceChatList]);

  useEffect(() => {
    setChatHistory();
  }, [setChatHistory]);

  useEffect(() => {
    if (search) {
      const msg: MessageArgs = {
        userId: user?.id,
        aiMsg: '',
        userMsg: search,
        type: type
      };
      sendMsgToGetAIResponse(msg);
    }
  }, [search, sendMsgToGetAIResponse, type, user]);

  return (
    <div className="flex h-full w-[40vw] flex-col">
      <ModalCategory
        open={open}
        onOk={() => {
          setChatCategory();
        }}
        onCancel={() => {
          setOpen(false);
        }}
        value={category}
        setValue={setCategory}
        type="chat"
      />
      <SelectPrompt
        item={chatList.filter((item) => item.type === type)}
        onSelectChange={handleSelectValue}
        value={selectValue}
      />
      <div className="flex-1 overflow-auto">
        <MessageItem message={selectedAiValue} isLoading={isLoading} />
      </div>
      <Flex gap="middle" align="flex-end" justify="flex-end">
        <Button type="primary" onClick={reSendMessage}>
          重新生成
        </Button>
        <Button type="primary" onClick={() => setOpen(true)}>
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
          <Button type="dashed">加载中</Button>
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
