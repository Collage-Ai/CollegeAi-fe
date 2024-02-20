'use client';
import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import { MessageArgs } from '@/types/user';

const cardStyle: React.CSSProperties = {
  //width: '50vw'
};
type CardInsightProps = {
  item: MessageArgs;
};

const CardInsight: React.FC<CardInsightProps> = ({ item }) => {
  const title = item.userMsg;
  const content = item.aiMsg;
  return (
    <Card
      hoverable
      style={cardStyle}
      styles={{ body: { padding: 0, overflow: 'hidden' } }}
      title={title}
    >
      <Flex
        vertical
        align="flex-start"
        justify="space-between"
        style={{ padding: 24 }}
      >
        <Typography.Text>{content}</Typography.Text>
        <Button type="primary" href="https://ant.design" target="_blank">
          Get Started
        </Button>
      </Flex>
    </Card>
  );
};

export default CardInsight;
