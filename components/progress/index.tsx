import React from 'react';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Steps } from 'antd';

const Progress: React.FC = () => (
  <Steps
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />
      },
      {
        title: 'Pay',
        status: 'process',
        icon: <LoadingOutlined />
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />
      }
    ]}
  />
);

export default Progress;
