// app/components/AppSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';

const { Sider } = Layout;

const AppSider: React.FC<{
  items: MenuProps['items'];
  style?: React.CSSProperties;
}> = ({ items, style }) => (
  <Sider style={style}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  </Sider>
);

export default AppSider;
