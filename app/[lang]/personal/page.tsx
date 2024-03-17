'use client';
import withAuth from '@/components/auth';
import BackButton from '@/components/button/backButton';
import RegisterForm from '@/components/user/register';
import { useUserStore } from '@/store/userStore';
import { Card } from 'antd';
import { useRouter } from 'next/navigation';

function Page() {
  const { setIsLogin } = useUserStore();
  const Router = useRouter();
  const handleLogout = () => {
    // 处理注册成功逻辑
    setIsLogin(false);
    Router.push('/login');
  };
  return (
    <>
      <BackButton title="个人中心" />
      <Card
        className="ml-[25vw] mt-[10vh] flex min-h-[40vh] w-[50vw] items-center justify-center"
        hoverable
        bordered
      >
        <RegisterForm isPersonal={true} onRegisterSuccess={handleLogout} />
      </Card>
      ;
    </>
  );
}

export default withAuth(Page);
