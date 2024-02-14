// app/components/AppSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const items: MenuProps['items'] = [
  //子菜单
  {
    key: '1',
    label: 'Browse',
    icon: <LaptopOutlined />,
    children: [
      { key: '1-1', label: '行业洞察' },
      { key: '1-2', label: '技能提升' }
    ]
  },
  { key: '2', label: '我的主页', icon: <LaptopOutlined /> }
];

const AppSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => (
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
