// app/components/SkillSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useSkillStore } from '@/store/userStore';
import Router from 'next/router';

const { Sider } = Layout;

const SkillSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { skillList } = useSkillStore();
  const items: MenuProps['items'] = [];
  skillList
    .filter((skill) => {
      skill.category === 1;
    })
    .map((skill) => {
      items.push({
        key: skill.id ?? skill.title,
        label: skill.title,
        //点击跳转到对应的技能点
        onClick: () => {
          Router.push({
            pathname: '/skill/detail',
            query: { item: JSON.stringify(skill) }
          });
        }
      });
    });
  return (
    <Sider style={style}>
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};

export default SkillSider;
