import React, { useEffect, useState } from 'react';
import { Card, Col, List, Row } from 'antd';
import { useSkillStore } from '@/store/userStore';
import { getSkillList } from '@/utils/fetcher';
import { useStateCallback } from '@/utils/hook';
import { SkillArgs } from '@/types/components/skill';

const SkillComponent: React.FC = () => {
  const { setSkillList } = useSkillStore();
  const [internshipList, setInternshipList] = useStateCallback([]);
  const [skillList1, setSkillList1] = useStateCallback([]);
  const [skillList2, setSkillList2] = useStateCallback([]);
  const [skillList3, setSkillList3] = useStateCallback([]);

  useEffect(
    () => {
      getSkillList().then((res) => {
        setSkillList(res);
        // 在数据设置后进行筛选
        setInternshipList(res.filter((item) => item.type === '实习'));
        setSkillList1(res.filter((item) => item.type === '技能点1'));
        setSkillList2(res.filter((item) => item.type === '技能点2'));
        setSkillList3(res.filter((item) => item.type === '技能点3'));
      });
    },
    [
      // setInternshipList,
      // //setSkillList,
      // setSkillList1,
      // setSkillList2,
      // setSkillList3
    ]
  );

  return (
    <div>
      <Card>
        <Row justify="center" gutter={16}>
          <Col span={6}>
            <Card title="实习">
              <List
                dataSource={internshipList}
                renderItem={(item: SkillArgs) => (
                  <List.Item>{item.title}</List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="技能点1">
              <List
                dataSource={skillList1}
                renderItem={(item: SkillArgs) => (
                  <List.Item>{item.title}</List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="技能点2">
              <List
                dataSource={skillList2}
                renderItem={(item: SkillArgs) => (
                  <List.Item>{item.title}</List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="技能点3">
              <List
                dataSource={skillList3}
                renderItem={(item: SkillArgs) => (
                  <List.Item>{item.title}</List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SkillComponent;
