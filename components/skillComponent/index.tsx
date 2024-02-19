import { Card, Col, List, Row } from 'antd';

const SkillComponent: React.FC = () => {
  return (
    <div>
      <Card>
        <Row justify="center" gutter={16}>
          <Card title="实习">
            <List />
          </Card>
          <Card title="技能点1">
            <List />
          </Card>
          <Card title="技能点2">
            <List />
          </Card>
          <Card title="技能点3">
            <List />
          </Card>
        </Row>
      </Card>
    </div>
  );
};

export default SkillComponent;
