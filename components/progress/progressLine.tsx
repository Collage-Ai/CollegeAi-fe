import React from 'react';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Steps } from 'antd';
import { useUserStore } from '@/store/userStore';

const ProgressLine: React.FC = () => {
  const { analyticsResult } = useUserStore();
  return (
    <Steps
      current={Number(analyticsResult?.分析结果) || 0}
      items={[
        {
          title: '探索阶段',

          icon: <UserOutlined />
        },
        {
          title: '试探阶段',

          icon: <SolutionOutlined />
        },
        {
          title: '确定阶段',

          icon: <LoadingOutlined />
        },
        {
          title: '过渡阶段',

          icon: <SmileOutlined />
        }
      ]}
    />
  );
};

export default ProgressLine;
