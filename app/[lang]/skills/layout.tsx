import BackButton from '@/components/button/backButton';
import SkillSider from '@/components/sider/skillSider';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col">
        <BackButton title="资源速配" />
        <Row justify="center" gutter={16} wrap={false}>
          <Card title="我的任务" style={{ width: 300 }}>
            <SkillSider />
          </Card>
          {children}
        </Row>
      </div>
    </div>
  );
};

export default Layout;
