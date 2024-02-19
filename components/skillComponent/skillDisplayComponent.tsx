import { SkillArgs } from '@/types/components/skill';
import { Button, Card, Flex, Typography } from 'antd';
import PropTypes from 'prop-types';
import ModalCategory from '../modal/modalCategory';
import { useStateCallback } from '@/utils/hook';
import { useCategoryStore } from '@/store/userStore';

type SkillDisplayComponentProps = {
  skill: SkillArgs;
};

const SkillDisplayComponent: React.FC<SkillDisplayComponentProps> = ({
  skill
}) => {
  const [open, setOpen] = useStateCallback(false);
  const [value, setValue] = useStateCallback([] as (string | number)[]);
  const { categoryList } = useCategoryStore();
  return (
    <Card title={skill.title}>
      <ModalCategory
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        value={value}
        setValue={setValue}
        type="skill"
        skillOptions={categoryList.filter((item) => item.type === 'skill')}
      />
      <Typography.Text>{skill.description}</Typography.Text>
      <Flex>
        <Button type="primary" onClick={() => setOpen(true)}>
          归档
        </Button>
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
