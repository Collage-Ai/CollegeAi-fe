import { create } from 'zustand';
import { MessageArgs, UserBaseInfo } from '../types/user';

interface UserState {
  user: UserBaseInfo | null;
  setUser: (user: UserBaseInfo | null) => void; // Updated parameter type
  logout: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // 初始用户状态为空
  setUser: (user) => set({ user }), // 更新用户信息
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
  chatList: [
    // 初始聊天记录为空
    {
      userId: 0,
      message: '你好，我是AI助手，有什么可以帮助你的吗？',
      sender: 'ai'
    },
    {
      userId: 0,
      message: '我有一个问题',
      sender: 'user'
    }
  ],
  // 允许setChatList接受一个函数，该函数基于当前chatList计算新的chatList
  setChatList: (fn: (currentList: MessageArgs[]) => MessageArgs[]) =>
    set((state) => ({ chatList: fn(state.chatList) }))
}));
