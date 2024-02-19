// app/components/SkillSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useSkillStore } from '@/store/userStore';

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
        label: skill.title
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
