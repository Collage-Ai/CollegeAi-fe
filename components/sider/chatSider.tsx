// app/components/ChatSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

const ChatSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const router = useRouter();
  const items: MenuProps['items'] = [
    //子菜单
    {
      key: '1',
      label: '行业概览',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '1-1',
          label: '定义与范围',
          onClick: () => {
            // 跳转到/insights
            router.push('/insights');
          }
        },
        {
          key: '1-2',
          label: '历史发展',
          onClick: () => {
            // 跳转到/skills
            router.push('/skills');
          }
        },
        {
          key: '1-3',
          label: '当前状态',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    },
    {
      key: '2',
      label: '市场分析',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '2-1',
          label: '主要参与者',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '2-2',
          label: '增长领域',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '1-3',
          label: '消费者需求',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '1-4',
          label: '新兴技术',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    },
    {
      key: '3',
      label: '技术趋势',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '3-1',
          label: '新兴技术',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '3-2',
          label: '技术应用',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    },
    {
      key: '4',
      label: '职业机会与发展',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '4-1',
          label: '典型职位',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '4-2',
          label: '技能需求',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '4-3',
          label: '薪酬范围',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    },
    {
      key: '5',
      label: '工作环境与文化',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '5-1',
          label: '工作强度',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '5-2',
          label: '职业满意度',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '5-3',
          label: '文化与价值观',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    },
    {
      key: '6',
      label: '法规与政策',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '6-1',
          label: '行业法规',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '6-2',
          label: '政策支持',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    },
    {
      key: '7',
      label: '国际视角',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '7-1',
          label: '全球市场影响',
          onClick: () => {
            router.push('/login');
          }
        },
        {
          key: '7-2',
          label: '跨国公司作用',
          onClick: () => {
            router.push('/login');
          }
        }
      ]
    }
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

export default ChatSider;
