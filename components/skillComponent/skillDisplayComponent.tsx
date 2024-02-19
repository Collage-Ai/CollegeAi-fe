import { SkillArgs } from '@/types/components/skill';
import { Button, Card, Flex, Typography } from 'antd';
import PropTypes from 'prop-types';

type SkillDisplayComponentProps = {
  skill: SkillArgs;
};

const SkillDisplayComponent: React.FC<SkillDisplayComponentProps> = ({
  skill
}) => {
  return (
    <Card title={skill.title}>
      <Typography.Text>{skill.description}</Typography.Text>
      <Flex>
        <Button type="primary">归档</Button>
      </Flex>
    </Card>
  );
};

SkillDisplayComponent.propTypes = {
  skill: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default SkillDisplayComponent;
