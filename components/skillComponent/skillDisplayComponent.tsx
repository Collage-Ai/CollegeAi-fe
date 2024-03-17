'use client';
import { SkillArgs } from '@/types/components/skill';
import { Button, Card, Flex, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useSkillStore } from '@/store/userStore';
import { sendSkillInfoToServer } from '@/utils/fetcher';
import { ActivityInfo } from '../../types/components/ai';

type SkillDisplayComponentProps = {
  skill: SkillArgs;
};

const SkillDisplayComponent: React.FC<SkillDisplayComponentProps> = ({
  skill
}) => {
  // const [open, setOpen] = useStateCallback(false);
  // const [value, setValue] = useStateCallback([] as (string | number)[]);
  const { skillList, setSkillList } = useSkillStore();
  //在skillList中查找当前skill，并更新category为1
  const addCategory = () => {
    const index = skillList.findIndex((item) => item.title === skill.title);
    if (index !== -1) {
      skillList[index].category = 1;
    }
    sendSkillInfoToServer(skillList[index]);
    setSkillList(skillList);
  };
  return (
    <Card title={skill.title}>
      {/* <ModalCategory
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        value={value}
        setValue={setValue}
        type="skill"
        skillOptions={categoryList.filter((item) => item.type === 'skill')}
      /> */}
      <Typography.Text>{skill.description.活动简介}</Typography.Text>
      <Flex>
        <Button type="primary" onClick={addCategory}>
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
    description: PropTypes.shape({
      活动名称: PropTypes.string.isRequired,
      活动日期: PropTypes.string.isRequired,
      活动地点: PropTypes.string.isRequired,
      活动简介: PropTypes.string.isRequired,
      参与方式: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired,
    category: PropTypes.number.isRequired
  }).isRequired
};

export default SkillDisplayComponent;
