import create from 'zustand';
import { MessageArgs, UserBaseInfo } from '../types/user';

interface UserState {
  user: UserBaseInfo | null;
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

//存储聊天记录
interface ChatState {
  chatList: MessageArgs[];
  setChatList: (fn: (currentList: MessageArgs[]) => MessageArgs[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatList: [],
  // 允许setChatList接受一个函数，该函数基于当前chatList计算新的chatList
  setChatList: (fn: (currentList: MessageArgs[]) => MessageArgs[]) =>
    set((state) => ({ chatList: fn(state.chatList) }))
}));
