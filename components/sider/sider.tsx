// app/components/AppSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

const AppSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const router = useRouter();
  const items: MenuProps['items'] = [
    //子菜单
    {
      key: '1',
      label: 'Browse',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '1-1',
          label: '行业洞察',
          onClick: () => {
            // 跳转到/insights
            router.push('/insights');
          }
        },
        {
          key: '1-2',
          label: '技能提升',
          onClick: () => {
            // 跳转到/skills
            router.push('/skills');
          }
        }
      ]
    },
    { key: '2', label: '我的主页', icon: <LaptopOutlined /> }
  ];
  return (
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
};

export default AppSider;
