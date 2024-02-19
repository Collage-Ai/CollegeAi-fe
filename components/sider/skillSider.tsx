// app/components/SkillSider.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useCategoryStore, useChatStore } from '@/store/userStore';

const { Sider } = Layout;

const SkillSider: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { categoryList } = useCategoryStore();
  const items: MenuProps['items'] = [];
  categoryList.forEach((category) => {
    items.push({
      key: category.id ?? category.categoryText,
      label: category.categoryText
    });
  });
  return (
    <Sider style={style}>
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        // onClick={({ key }) => {
        //   setChatCategory(key);
        // }}
      />
    </Sider>
  );
};

export default SkillSider;
