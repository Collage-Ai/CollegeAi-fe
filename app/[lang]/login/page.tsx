import React, { useState } from 'react';
import LoginForm from '@/components/user/login';
import RegisterForm from '@/components/user/register';

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // 控制显示登录或注册表单

  const handleLoginSuccess = () => {
    // 处理登录成功逻辑，如跳转到主页
  };

  const handleRegisterSuccess = () => {
    // 处理注册成功逻辑
    setIsLogin(true); // 注册成功后切换到登录界面
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
