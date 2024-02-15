// components/RegisterForm.tsx
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterReqType } from '@/types/api';

type RegisterFormProps = {
  onRegisterSuccess: () => void;
};

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: RegisterReqType) => {
    setLoading(true);
    console.log('Received values of form: ', values);
    // 这里替换为你的注册逻辑
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess(); // 注册成功后的回调
      message.success('注册成功！');
    }, 1000);
  };

  return (
    <Form
      name="register_form"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入你的用户名!' }]}
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
      <Form.Item
        name="phone"
        rules={[{ required: true, message: '请输入你的手机号码!' }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="手机号码"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
          loading={loading}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
