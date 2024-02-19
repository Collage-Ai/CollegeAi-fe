import ChatComponent from '@/components/chatComponent';
import DisplayComponent from '@/components/displayComponent';
import ChatSider from '@/components/sider/chatSider';
import SkillSider from '@/components/sider/skillSider';
import SkillDisplayComponent from '@/components/skillComponent/skillDisplayComponent';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { SkillArgs } from '../../../../types/components/skill';

const Page: React.FC = () => {
  //接收路由参数
  const router = useRouter();
  const item = router.query.item as unknown as SkillArgs;
  return (
    <div>
      <Card>
        <SkillDisplayComponent skill={item} />
      </Card>
    </div>
  );
};

export default Page;
