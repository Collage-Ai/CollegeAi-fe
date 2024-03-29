'use client';
import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';

const cardStyle: React.CSSProperties = {
  width: '50vw'
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: '20vw'
};

const CardHome: React.FC = () => (
  <Card
    hoverable
    style={cardStyle}
    styles={{ body: { padding: 0, overflow: 'hidden' } }}
  >
    <Flex justify="space-between">
      <img
        alt="avatar"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        style={imgStyle}
      />
      <Flex
        vertical
        align="flex-end"
        justify="space-between"
        style={{ padding: 24 }}
      >
        <Typography.Title level={3}>
          “antd is an enterprise-class UI design language and React UI library.”
        </Typography.Title>
        <Button type="primary" href="https://ant.design" target="_blank">
          Get Started
        </Button>
      </Flex>
    </Flex>
  </Card>
);

export default CardHome;
