'use client';
import React, { useState } from 'react';
import LoginForm from '@/components/user/login';
import RegisterForm from '@/components/user/register';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

const App = () => {
  const { isLogin, setIsLogin } = useUserStore();
  const Router = useRouter();

  const handleLoginSuccess = () => {
    // 处理登录成功逻辑，如跳转到主页
    Router.push('/');
  };

  const handleRegisterSuccess = () => {
    // 处理注册成功逻辑
    setIsLogin(true); // 注册成功后切换到登录界面
    Router.push('/');
  };

  return (
    <div className="App">
      {isLogin ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      )}
      <a onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '没有账号？去注册' : '已有账号？去登录'}
      </a>
    </div>
  );
};

export default App;
