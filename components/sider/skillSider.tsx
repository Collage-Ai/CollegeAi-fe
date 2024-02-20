'use client';
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useSkillStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

const SkillSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { skillList, setSkillDisplayItem } = useSkillStore();
  const items: MenuProps['items'] = [];
  const Router = useRouter();
  skillList
    .filter((skill) => skill.category === 1) // Fix: Added missing return statement in the filter callback.
    .map((skill) => {
      items.push({
        key: skill.id ?? skill.title,
        label: skill.title,
        onClick: () => {
          setSkillDisplayItem(skill);
          Router.push('/skills/detail');
        }
      });
    });
  //console.log(items);
  return (
    <Sider title="我的任务">
      {/* <Typography.Title level={3}>我的任务</Typography.Title> */}
      {/* <h1>我的任务</h1> */}
      <Menu
        mode="inline"
        style={{ height: '100vh', borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};

export default SkillSider;
