'use client';
import React, { useState } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterReqType } from '@/types/api';
import { postRegData } from '@/utils/fetcher';
import toast from '../toast/toast';

type RegisterFormProps = {
  onRegisterSuccess: () => void;
};

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);
  //const { data, error } = useSWR('/user/register', fetcher);

  const onFinish = async (values: RegisterReqType) => {
    setLoading(true);
    if (await postRegData(values)) {
      setLoading(false);
      onRegisterSuccess(); // 注册成功后的回调
      toast.success('注册成功！');
    }
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
      <Form.Item
        name="captcha"
        rules={[{ required: true, message: '请输入验证码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="验证码"
        />
      </Form.Item>
      <Form.Item name="education" rules={[{ required: true, message: '学历' }]}>
        <Radio.Group name="education">
          <Radio value={1}>高中</Radio>
          <Radio value={2}>本科</Radio>
          <Radio value={3}>硕士</Radio>
        </Radio.Group>
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
