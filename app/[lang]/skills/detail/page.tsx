import SkillDisplayComponent from '@/components/skillComponent/skillDisplayComponent';
import { Card } from 'antd';

import { SkillArgs } from '../../../../types/components/skill';
import { useSkillStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import toast from '@/components/toast/toast';

const Page: React.FC = () => {
  const { skillDisplayItem } = useSkillStore();
  const router = useRouter();
  if (!skillDisplayItem) {
    toast.error('未找到数据');
    router.push('/');
  }
  return (
    <div>
      <Card>
        <SkillDisplayComponent skill={skillDisplayItem as SkillArgs} />
      </Card>
    </div>
  );
};

export default Page;
