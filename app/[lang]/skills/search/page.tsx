'use client';
import ChatComponent from '@/components/chatComponent';
import DisplayComponent from '@/components/displayComponent';
import ChatSider from '@/components/sider/chatSider';
import SkillSider from '@/components/sider/skillSider';
import { useChatStore } from '@/store/userStore';
import { Card, Flex } from 'antd';
export default function Page() {
  return (
    <>
      <ChatComponent type="skill" />
    </>
  );
}
