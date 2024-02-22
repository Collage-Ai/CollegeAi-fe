'use client';
import withAuth from '@/components/auth';
import BackButton from '@/components/button/backButton';
import ChatComponent from '@/components/chatComponent';
import DisplayComponent from '@/components/displayComponent';
import ChatSider from '@/components/sider/chatSider';
import { useChatStore } from '@/store/userStore';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { animated, useTransition } from 'react-spring';

function Page() {
  const { displayCategory, setDisplayCategory } = useChatStore();

  // 为 DisplayComponent 创建过渡动画
  const transitions = useTransition(displayCategory !== -1, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' }
  });

  return (
    <>
      <div className="flex flex-col items-start justify-center">
        {/* 返回首页 */}
        <BackButton title="个性化行业洞察" />
        <Flex>
          <Card title="基本信息">
            <ChatSider />
          </Card>
          {transitions(
            (style, item) =>
              item && (
                <animated.div style={style}>
                  <Card
                    extra={
                      <CloseOutlined onClick={() => setDisplayCategory(-1)} />
                    }
                  >
                    <DisplayComponent />
                  </Card>
                </animated.div>
              )
          )}
          <Card>
            <ChatComponent type="insight" />
          </Card>
        </Flex>
      </div>
    </>
  );
}

export default withAuth(Page);
