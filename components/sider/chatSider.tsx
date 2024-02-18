// app/components/ChatSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/store/userStore';

const { Sider } = Layout;

const ChatSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { chatList, setChatCategoryList, setDisplayCategory } = useChatStore();
  const items: MenuProps['items'] = [
    //子菜单
    {
      key: 'a',
      label: '行业概览',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '1',
          label: '定义与范围'
        },
        {
          key: '2',
          label: '历史发展'
        },
        {
          key: '3',
          label: '当前状态'
        }
      ]
    },
    {
      key: 'b',
      label: '市场分析',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '4',
          label: '主要参与者'
        },
        {
          key: '5',
          label: '增长领域'
        },
        {
          key: '6',
          label: '消费者需求'
        }
      ]
    },
    {
      key: 'c',
      label: '技术趋势',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '7',
          label: '新兴技术'
        },
        {
          key: '8',
          label: '技术应用'
        }
      ]
    },
    {
      key: 'd',
      label: '职业机会与发展',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '9',
          label: '典型职位'
        },
        {
          key: '10',
          label: '技能需求'
        },
        {
          key: '11',
          label: '薪酬范围'
        }
      ]
    },
    {
      key: 'e',
      label: '工作环境与文化',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '12',
          label: '工作强度'
        },
        {
          key: '13',
          label: '职业满意度'
        },
        {
          key: '14',
          label: '文化与价值观'
        }
      ]
    },
    {
      key: 'f',
      label: '法规与政策',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '15',
          label: '行业法规'
        },
        {
          key: '16',
          label: '政策支持'
        }
      ]
    },
    {
      key: 'g',
      label: '国际视角',
      icon: <LaptopOutlined />,
      children: [
        {
          key: '17',
          label: '全球市场影响'
        },
        {
          key: '18',
          label: '跨国公司作用'
        }
      ]
    }
  ];
  //根据所选item的key值对chatList进行筛选,并将筛选后的结果存入chatCategoryList
  const setChatCategory = (key: string) => {
    const category = chatList.filter((item) => item.category === Number(key));
    setChatCategoryList(category);
    setDisplayCategory(Number(key));
  };
  return (
    <Sider style={style}>
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        onClick={({ key }) => {
          setChatCategory(key);
        }}
      />
    </Sider>
  );
};

export default ChatSider;
