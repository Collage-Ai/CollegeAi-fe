// app/components/AppHeader.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC<{ items: MenuProps['items'] }> = ({ items }) => (
  <Header style={{ display: 'flex', alignItems: 'center' }}>
    <div className="demo-logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  </Header>
);

export default AppHeader;
