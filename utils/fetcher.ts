import { LoginReqType, LoginResType } from '@/types/api';
import request from './request';
import { UserBaseInfo } from '@/types/user';
import { useUserStore } from '@/store/userStore';

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
    const res = await request('/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return res.json().then((data: LoginResType) => {
        if (data.code === 200) {
          localStorage.setItem('token', data.data?.token ?? ''); // 登录成功，保存 token
          return data.data?.userBaseInfo;
        }
        return false;
      });
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
