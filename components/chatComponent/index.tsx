'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxProps, Flex, Input, Tooltip } from 'antd';
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
  const [isLoading, setIsLoading] = useStateCallback(false);
  const [selectedAiValue, setSelectedAiValue] = useState(''); //下方聊天框的值
  const [selectValue, setSelectValue] = useStateCallback('请选择'); //上方选择框的值
  const [category, setCategory] = useStateCallback([]); // 用于存储归档的类别
  const [isWebChat, setIsWebChat] = useStateCallback(false); //是否使用联网功能
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

  const handleSelectValue = ({
    userMsg,
    aiMsg
  }: {
    userMsg: string;
    aiMsg: string;
  }) => {
    setSelectValue(userMsg); //此处有问题
    setSelectedAiValue(aiMsg);
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
      setIsLoading((isLoading: boolean) => !isLoading);
      setSelectValue(msg.userMsg);
      getAIResponse({ message: msg.userMsg, isWeb: isWebChat })
        .then((res) => {
          if (isWebChat) {
            msg.aiMsg = res.content as string;
            updateChatList(msg);
            setSelectedAiValue(res.content as string);
          } else {
            msg.aiMsg = res as string;
            updateChatList(msg);
            setSelectedAiValue(res as string);
          }
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
        type: type,
        time: new Date().toLocaleString(),
        category: 0
      };
      sendMsgToGetAIResponse(msg);
    }
  };

  //重新发送消息
  const reSendMessage = () => {
    const selectMsg = chatList.find(
      (item) => item.userMsg === selectValue
    ) as MessageArgs;

    sendMsgToGetAIResponse(selectMsg);
  };

  const setChatCategory = () => {
    //设置所选择消息的类别
    const msg = chatList.find(
      (item) => item.userMsg === selectValue
    ) as MessageArgs;
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

  const onCheckBoxChange: CheckboxProps['onChange'] = (e) => {
    setIsWebChat(e.target.checked);
  };

  useEffect(() => {
    setChatHistory();
  }, [setChatHistory]);

  useEffect(() => {
    if (search) {
      const msg: MessageArgs = {
        userId: user?.id,
        aiMsg: '',
        userMsg: search,
        type: type,
        time: new Date().toLocaleString(),
        category: 0
      };
      setIsLoading(true);
      sendMsgToGetAIResponse(msg);
    }
  }, []);

  return (
    <div className="flex h-full w-[50vw] flex-col">
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
        <Tooltip title="注意：联网后需要进行网络检索，速度可能较慢，请耐心等待">
          <Checkbox onChange={onCheckBoxChange}>使用联网功能</Checkbox>;
        </Tooltip>
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
