// store/userStore.ts
import create from 'zustand';
import { UserBaseInfo } from '../types/user';

interface UserState {
  user: { userBaseInfo: UserBaseInfo } | null;
  setUser: (user: UserState) => void; // Updated parameter type
  logout: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // 初始用户状态为空
  setUser: (user) => set(user),
  logout: () => set({ user: null }), // 退出登录，清空用户信息
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin })
}));
