import { JSX, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookie';

const withAuth = (WrappedComponent: React.FC) => {
  const RequiresAuth = (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const checkAuth = () => {
      if (getCookie('token')) {
        return true;
      }
      return false;
    };
    const isAuthenticated = checkAuth(); // 实现你的认证检查逻辑
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // 如果未认证，重定向到登录页
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null; // 如果已认证，渲染原始组件
  };

  return RequiresAuth;
};

export default withAuth;
