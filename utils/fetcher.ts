import { LoginReqType, LoginResType, RegisterReqType } from '@/types/api';
import request from './request';
import { MessageArgs, UserBaseInfo } from '@/types/user';
import { useUserStore } from '@/store/userStore';
import { deleteCookie, getCookie, setCookie } from './cookie';
import { SkillArgs } from '@/types/components/skill';
import { CategoryArgs } from '@/types/components/category';
import axios from 'axios';
import toast from '@/components/toast/toast';

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
    if (res.msg === 'success') {
      return true;
    }
    return false;
  } catch (err: any) {
    console.error(err);
    //如果400，说明用户名已存在
    return false;
  }
};

export const postLoginData = async (
  data: LoginReqType
): Promise<UserBaseInfo | false> => {
  try {
    const res: LoginResType = await request('/user/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.msg === 'success' && res.data?.token) {
      if (getCookie('token')) {
        deleteCookie('token');
      }
      setCookie('token', res.data?.token ?? '');
      return res.data?.userInfo ?? false;
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
    //如果有id则为更新，否则为新增
    if (messageArgs.id) {
      const res = await request(`/chat`, {
        method: 'PATCH',
        body: JSON.stringify(messageArgs)
      });
      if (res.msg === 'success') {
        return null;
      }
      return null;
    } else {
      const res = await request('/chat', {
        method: 'POST',
        body: JSON.stringify(messageArgs)
      });
      if (res.msg === 'success') {
        return res.data;
      }
      return null;
    }
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
    if (res.msg === 'success') {
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
    const res = await request(`/chat/${useUserStore.getState().user?.id}`);
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
    const res = await request(`/skill/${useUserStore.getState().user?.id}`);
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
    //如果有id则为更新，否则为新增
    if (data.id) {
      //更新技能
      const res = await request(`/skill/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
      if (res.msg === 'success') {
        return true;
      }
      return false;
    } else {
      const res = await request('/skill', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (res.msg === 'success') {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * 获取类型列表
 * @param {number} userId 用户id
 * @returns {Promise<CategoryArgs[]>} 类型列表
 * */
export const getCategoryList = async (): Promise<CategoryArgs[]> => {
  try {
    const res = await request(`/category/${useUserStore.getState().user?.id}`);
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
 * 发送类型信息到服务器
 * @param {categoryArgs} data 类型信息
 * @returns {Promise<boolean>} 是否发送成功
 * */
export const sendCategoryInfoToServer = async (
  text: string
): Promise<boolean> => {
  try {
    const data: CategoryArgs = {
      userId: useUserStore.getState().user?.id ?? 0,
      type: 'chat',
      categoryText: text
    };
    const res = await request('/category', {
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

/**
 * 根据token,获取用户信息
 * @returns {Promise<UserBaseInfo | null>} 用户信息
 */
export const getUserInfo = async (): Promise<UserBaseInfo | null> => {
  try {
    const res = await request('/user/info');
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
 * @description: 更新用户信息
 * @param {UserBaseInfo} data 用户信息
 * @return {Promise<boolean>} 是否更新成功
 * */
export const updateUserInfo = async (data: UserBaseInfo): Promise<boolean> => {
  try {
    const res = await request(`/user/${data.id}`, {
      method: 'PATCH',
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

/**
 * @description: 进行联网ai对话
 * @param {string} message 用户消息
 * @return {Promise<string>} ai回复
 * */
export const getWebAIResponse = async (message: string): Promise<string> => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_WEB_CHAT_URL ?? '', {
      query: message,
      isSort: false,
      type: 'insight',
      userInfo: useUserStore.getState().user,
      field: useUserStore.getState().user?.career
    });
    return res.data;
  } catch (err) {
    console.error(err);
    toast.error('AI服务异常，请稍后再试');
    return '';
  }
};
