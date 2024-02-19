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
      <div className="flex flex-col items-center justify-center">
        <h1>资源速配</h1>
        <Flex>
          <Card title="我的任务">
            <SkillSider />
          </Card>
          <Card>
            <ChatComponent />
          </Card>
          <Card title="最新资源"></Card>
        </Flex>
      </div>
    </>
  );
}
