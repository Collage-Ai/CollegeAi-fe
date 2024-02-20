'use client';
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginReqType, LoginResType } from '@/types/api';
import { postLoginData } from '@/utils/fetcher';
import { useUserStore } from '@/store/userStore';
import { UserBaseInfo } from '@/types/user';

type LoginFormProps = {
  onLoginSuccess: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();

  const onFinish = async (values: LoginReqType) => {
    setLoading(true);
    postLoginData(values).then((res: UserBaseInfo | false) => {
      if (res) {
        setLoading(false);
        message.success('登录成功！');
        setUser(res);
        onLoginSuccess(); // 登录成功后的回调
      } else {
        setLoading(false);
        message.error('登录失败！');
      }
    });
  };

  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="phone"
        rules={[{ required: true, message: '请输入你的手机号码' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入你的密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
