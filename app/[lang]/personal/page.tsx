import BackButton from '@/components/button/backButton';
import RegisterForm from '@/components/user/register';

export default function Page() {
  const handleRegisterSuccess = () => {
    console.log('成功');
  };
  return (
    <>
      <BackButton title="个人中心" />
      <RegisterForm
        isPersonal={true}
        onRegisterSuccess={handleRegisterSuccess}
      />
      ;
    </>
  );
}
