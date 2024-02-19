import SkillSider from '@/components/sider/skillSider';
import { Row } from 'antd';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col">
        <h1>资源速配</h1>
        <Row justify="center" gutter={16} wrap={false}>
          <SkillSider />
          {children}
        </Row>
      </div>
    </div>
  );
};

export default Layout;
