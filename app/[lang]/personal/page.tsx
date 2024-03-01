'use client';
import withAuth from '@/components/auth';
import BackButton from '@/components/button/backButton';
import RegisterForm from '@/components/user/register';
import { Card } from 'antd';

function Page() {
  const handleRegisterSuccess = () => {
    console.log('成功');
  };
  return (
    <>
      <BackButton title="个人中心" />
      <Card
        className="ml-[25vw] mt-[10vh] flex min-h-[40vh] w-[50vw] items-center justify-center"
        hoverable
        bordered
      >
        <RegisterForm
          isPersonal={true}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </Card>
      ;
    </>
  );
}

export default withAuth(Page);
