import { SkillArgs } from '@/types/components/skill';
import { Card, Typography } from 'antd';
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
