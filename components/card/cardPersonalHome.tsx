import { useUserStore } from '@/store/userStore';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';

const CardPersonalHome = () => {
  const { user } = useUserStore();
  return (
    <Card hoverable>
      <Avatar size={64} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Meta title={user?.username} description={user?.collegeStage} />
    </Card>
  );
};
export default CardPersonalHome;
