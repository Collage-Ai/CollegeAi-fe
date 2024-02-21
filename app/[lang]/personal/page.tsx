import RegisterForm from '@/components/user/register';

export default function Page() {
  return <RegisterForm isPersonal={true} onRegisterSuccess={() => {}} />;
}
