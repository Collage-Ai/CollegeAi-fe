'use client';
import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import { SkillArgs } from '@/types/components/skill';
import { useRouter } from 'next/navigation';
import { useSkillStore } from '@/store/userStore';

const cardStyle: React.CSSProperties = {
  //width: '50vw'
};
type CardSkillItemProps = {
  item: SkillArgs;
};

const CardSkillItem: React.FC<CardSkillItemProps> = ({ item }) => {
  const title = item.title;
  const content = item.description;
  const router = useRouter();
  const { setSkillDisplayItem } = useSkillStore();
  const handleClick = async () => {
    setSkillDisplayItem(item);
    router.push('/detail');
  };

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
        {Object.keys(content).map((key) => {
          return (
            <>
              <Typography.Text key={key}>
                {key}: {content[key as keyof typeof content]}
              </Typography.Text>
              <Button type="primary" onClick={handleClick}>
                Get Started
              </Button>
            </>
          );
        })}
      </Flex>
    </Card>
  );
};

export default CardSkillItem;
