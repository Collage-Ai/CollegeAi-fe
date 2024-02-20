import SkillDisplayComponent from '@/components/skillComponent/skillDisplayComponent';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { SkillArgs } from '../../../../types/components/skill';

const Page: React.FC = () => {
  //接收路由参数
  const router = useRouter();
  const { item } = router.query;
  const decodedItem = item
    ? JSON.parse(decodeURIComponent(item as string))
    : null;
  return (
    <div>
      <Card>
        <SkillDisplayComponent skill={decodedItem} />
      </Card>
    </div>
  );
};

export default Page;
