'use client';
import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import { MessageArgs } from '@/types/user';
import { SkillArgs } from '@/types/components/skill';
import Router from 'next/router';

const cardStyle: React.CSSProperties = {
  width: '50vw'
};
type CardSkillItemProps = {
  item: SkillArgs;
};

const CardSkillItem: React.FC<CardSkillItemProps> = ({ item }) => {
  const title = item.title;
  const content = item.description;
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
        <Button
          type="primary"
          onClick={() => {
            //路由传参
            Router.push({
              pathname: '/skill/detail',
              query: { item: JSON.stringify(item) }
            });
          }}
        >
          Get Started
        </Button>
      </Flex>
    </Card>
  );
};

export default CardSkillItem;
