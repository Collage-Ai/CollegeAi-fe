'use client';
import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { RegisterReqType } from '@/types/api';
import { postRegData } from '@/utils/fetcher';
import toast from '../toast/toast';
import { useStateCallback } from '@/utils/hook';

type RegisterFormProps = {
  onRegisterSuccess: () => void;
  isPersonal?: boolean;
};

const RegisterForm = ({ onRegisterSuccess, isPersonal }: RegisterFormProps) => {
  const [loading, setLoading] = useStateCallback(false);
  const [form] = Form.useForm();
  // form.setFieldsValue({
  //   name: props.user.name
  // });

  const onFinish = async (values: RegisterReqType) => {
    setLoading(true);
    console.log('Received values of form: ', values);
    postRegData(values).then((res) => {
      if (res) {
        setLoading(false);
        toast.success('操作成功！');
        if (!isPersonal) onRegisterSuccess(); // 注册成功后的回调
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <Form
      name="register_form"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="username"
        label="您的名字是？"
        rules={[{ required: true, message: '请输入你的姓名!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>
      {/* 阶段 */}
      <Form.Item
        name="education"
        label="你目前所处的阶段是？"
        rules={[{ required: true, message: '请输入你目前所处的阶段!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="参考：高三/大二/研一"
        />
      </Form.Item>
      <Form.Item
        name="major"
        label="你的专业是？"
        rules={[{ required: true, message: '请输入你的专业!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="参考：影视制作/电子信息工程/土木工程"
        />
      </Form.Item>
      <Form.Item
        name="career"
        label="你的职业方向是？"
        rules={[{ required: true, message: '请输入你的职业方向!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="参考：产品经理/科研院所研究员/编辑/室内设计师"
        />
      </Form.Item>
      <Form.Item
        name="careerExplore"
        label="对于该方向，你目前有关的探索是？"
        rules={[{ required: true, message: '请输入你的相关探索' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="参考：产品经理/科研院所研究员/编辑/室内设计师"
        />
      </Form.Item>
      <Typography.Title level={5}>个性化问题</Typography.Title>
      <Typography.Text>
        为了提供更好的服务，我们将收集如下信息，我们承诺此信息将严格保密，未经您的允许不作他用。
      </Typography.Text>
      <Form.Item
        name="advantage"
        label="你认为你在相关方向有什么优势？"
        rules={[{ required: true, message: '请输入你的优势' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="参考：我的性格比较符合：我比较拥有创造力、洞察力等/我拥有实习经历：一段网易的前端开发等"
        />
      </Form.Item>
      <Typography.Text type="secondary">
        ps：更多更详细的描述有助于我们为您提供更细节、更有效的职业规划和技能提升路径。
      </Typography.Text>
      <Form.Item
        name="collegeStage"
        label="你的在读院校是什么层次的？"
        rules={[{ required: true, message: '请输入你的院校层次' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="参考：高中/大专/二本/一本/双一流/211/985"
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="你的邮箱是？"
        rules={[{ required: true, message: '请输入你的邮箱' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
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
        name="SMSCode"
        rules={[{ required: true, message: '请输入验证码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="number"
          placeholder="验证码"
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
      {/* <Form.Item name="education" rules={[{ required: true, message: '学历' }]}>
        <Radio.Group name="education">
          <Radio value={1}>高中</Radio>
          <Radio value={2}>本科</Radio>
          <Radio value={3}>硕士</Radio>
        </Radio.Group>
      </Form.Item> */}
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
