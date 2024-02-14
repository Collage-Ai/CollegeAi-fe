'use client';
import { fetcher } from '@/utils/fetcher';
import { Card, Flex, Input } from 'antd';
import useSWR from 'swr';
export default function Page() {
  const { data } = useSWR('/api/user', fetcher);
  return (
    <>
      <h1>你的专属行业洞察</h1>
      <Flex>
        <Card title="基本信息"></Card>
        <Card>
          <Input placeholder="请输入关键词" title="Prompt" />
          <div>
            <h2>Ai回答</h2>
            <p>这是一个测试</p>
          </div>
          <div>
            <h2>Related</h2>
            <p>这是一个测试</p>
          </div>
        </Card>
        <Card title="最新行业信息"></Card>
      </Flex>
    </>
  );
}
