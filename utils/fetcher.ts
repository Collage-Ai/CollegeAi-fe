import { LoginReqType, LoginResType, RegisterReqType } from '@/types/api';
import request from './request';
import { MessageArgs, UserBaseInfo } from '@/types/user';
import { useUserStore } from '@/store/userStore';
import { deleteCookie, getCookie, setCookie } from './cookie';
import { SkillArgs } from '@/types/components/skill';

// utils/fetcher.ts
export const fetcher = (url: string) => request(url).then((res) => res.json());
const refreshToken = async () => {
  // 发送刷新 token 的请求...
  // 假设刷新 token 的端点是 '/api/refresh_token'
  const res = await fetch('/api/refresh_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }) // 发送 refreshToken
  });

  if (res.ok) {
    const { token, refreshToken } = await res.json();
    localStorage.setItem('token', token); // 更新 token
    localStorage.setItem('refreshToken', refreshToken); // 更新 refreshToken
    return true;
  }

  return false;
};

export const postRegData = async (data: UserBaseInfo): Promise<boolean> => {
  try {
    const res = await request('/user/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const postLoginData = async (data: LoginReqType) => {
  try {
    const res: LoginResType = await request('/user/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.msg === 'success') {
      if (getCookie('token')) {
        deleteCookie('token');
      }
      setCookie('token', res.data?.token ?? '');
      return res.data?.userInfo;
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * 发送聊天消息到服务器
 * @param message 消息内容
 * @returns {Promise<boolean>} 是否发送成功
 * @throws {Error} 发送失败时抛出异常
 * */
export const sendMsgToServer = async (
  messageArgs: MessageArgs
): Promise<MessageArgs | null> => {
  try {
    const res = await request('/chat/updateMessage', {
      method: 'POST',
      body: JSON.stringify(messageArgs)
    });
    if (res.msg === 'success') {
      return res.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * 发送用户注册信息到服务器
 * @param {RegisterReqType} data 用户注册信息
 * @returns {Promise<boolean>} 是否发送成功
 */
export const sendRegInfoToServer = async (
  data: RegisterReqType
): Promise<boolean> => {
  try {
    const res = await request('/user/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * 获取短信验证码
 * @param {string} phone 手机号
 * @returns {Promise<boolean>} 是否发送成功
 */
export const getSMSCode = async (phone: string): Promise<boolean> => {
  try {
    const res = await request('/user/sendCode', {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * 获取历史聊天记录
 * @returns {Promise<MessageArgs[]>} 历史聊天记录
 * */
export const getChatHistory = async (): Promise<MessageArgs[]> => {
  try {
    const res = await request('/chat/getMessages', {
      method: 'POST',
      body: JSON.stringify({ userId: useUserStore.getState().user?.id })
    });
    if (res.msg === 'success') {
      return res.data;
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * 获取技能列表
 * @param {number} userId 用户id
 * @returns {Promise<SkillArgs[]>} 技能列表
 */
export const getSkillList = async (): Promise<SkillArgs[]> => {
  try {
    const res = await request(`/skill?id=${useUserStore.getState().user?.id}`);
    if (res.msg === 'success') {
      return res.data;
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * 发送技能信息到服务器
 * @param {SkillArgs} data 技能信息
 * @returns {Promise<boolean>} 是否发送成功
 * */
export const sendSkillInfoToServer = async (
  data: SkillArgs
): Promise<boolean> => {
  try {
    const res = await request('/skill', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.msg === 'success') {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
