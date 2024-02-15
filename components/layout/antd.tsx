'use client';
// app/components/AppLayout.tsx
import React from 'react';
import { Layout, MenuProps, theme } from 'antd';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';
import useSWR from 'swr';
import AppHeader from '../header';
import AppSider from '../sider/sider';

// 假设 fetcher 和 items1, items2 定义保持不变
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`
}));

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //const { data, error } = useSWR('/api/data', fetcher); // 使用实际的 API 端点
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout className="min-h-full">
      <AppHeader items={items1} />
      <Layout>
        <AppSider style={{ background: colorBgContainer }} />
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* Display data fetched with SWR */}
          {/* {error ? (
            <div>Failed to load</div>
          ) : !data ? (
            <div>Loading...</div>
          ) : (
            <div>{JSON.stringify(data)}</div>
          )} */}
          {/* 插入 children */}
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
