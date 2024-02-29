'use client';
import React, { useState } from 'react';
import LoginForm from '@/components/user/login';
import RegisterForm from '@/components/user/register';
import { useCategoryStore, useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { getCategoryList } from '@/utils/fetcher';
import { useStateCallback } from '@/utils/hook';
import BackButton from '@/components/button/backButton';
import { Card } from 'antd';

const App = () => {
  const [isLoginPage, setIsLoginPage] = useStateCallback(true);
  const { setCategoryList } = useCategoryStore();
  const { setIsLogin } = useUserStore();
  const Router = useRouter();

  const handleLoginSuccess = () => {
    // 处理登录成功逻辑，如跳转到主页
    setIsLogin(true);
    getCategoryList().then((res) => {
      setCategoryList(res);
    });
    Router.push('/');
  };

  const handleRegisterSuccess = () => {
    // 处理注册成功逻辑

    setIsLoginPage(true); // 注册成功后切换到登录界面
  };

  return (
    <div>
      <BackButton title={isLoginPage ? '登录' : '注册'} />
      <Card
        className="ml-[25vw] mt-[10vh] flex min-h-[40vh] w-[50vw] items-center justify-center"
        hoverable
        bordered
      >
        {isLoginPage ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
        <a onClick={() => setIsLoginPage(!isLoginPage)}>
          {isLoginPage ? '没有账号？去注册' : '已有账号？去登录'}
        </a>
      </Card>
    </div>
  );
};

export default App;
