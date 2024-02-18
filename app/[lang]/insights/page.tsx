'use client';
import ChatComponent from '@/components/chatComponent';
import ChatSider from '@/components/sider/chatSider';
import { fetcher } from '@/utils/fetcher';
import { Card, Flex, Input } from 'antd';
import useSWR from 'swr';
import { Provider } from 'use-socket.io-hooks';
export default function Page() {
  //const { data } = useSWR('/api/user', fetcher);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>你的专属行业洞察</h1>
        <Flex>
          <Card title="基本信息">
            <ChatSider />
          </Card>
          <Card>
            <ChatComponent />
          </Card>
          <Card title="最新行业信息"></Card>
        </Flex>
      </div>
    </>
  );
}
