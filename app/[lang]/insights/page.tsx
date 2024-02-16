'use client';
import ChatComponent from '@/components/chatComponent';
import { fetcher } from '@/utils/fetcher';
import { Card, Flex, Input } from 'antd';
import useSWR from 'swr';
import { Provider } from 'use-socket.io-hooks';
export default function Page() {
  //const { data } = useSWR('/api/user', fetcher);
  return (
    <>
      <h1>你的专属行业洞察</h1>
      <Flex>
        <Card title="基本信息"></Card>
        <Card>
          <ChatComponent />
        </Card>
        <Card title="最新行业信息"></Card>
      </Flex>
    </>
  );
}
