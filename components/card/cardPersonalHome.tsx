import { useUserStore } from '@/store/userStore';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';

const CardPersonalHome = () => {
  const { user } = useUserStore();
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="avatar"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta title={user?.username} description={user?.collegeStage} />
    </Card>
  );
};
export default CardPersonalHome;
