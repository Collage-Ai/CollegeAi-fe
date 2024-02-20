import { create } from 'zustand';
import { MessageArgs, UserBaseInfo } from '../types/user';
import { SkillArgs } from '@/types/components/skill';
import { CategoryArgs } from '@/types/components/category';

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
  chatCategoryList: MessageArgs[];
  displayCategory: number;
  setChatList: (fn: (currentList: MessageArgs[]) => MessageArgs[]) => void;
  replaceChatList: (newList: MessageArgs[]) => void;
  setChatCategoryList: (list: MessageArgs[]) => void;
  setDisplayCategory: (category: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatList: [
    {
      userId: 0,
      aiMsg: '你好，我是AI助手，有什么可以帮助你的吗？',
      userMsg: '我有一个问题',
      time: '2021-09-12 12:00:00',
      type: 'insight'
    }
  ],
  chatCategoryList: [],
  // 允许setChatList接受一个函数，该函数基于当前chatList计算新的chatList
  setChatList: (fn: (currentList: MessageArgs[]) => MessageArgs[]) =>
    set((state) => ({ chatList: fn(state.chatList) })),
  //完全替换chatList
  replaceChatList: (newList: MessageArgs[]) => set({ chatList: newList }),
  setChatCategoryList: (list) => set({ chatCategoryList: list }),
  displayCategory: -1,
  setDisplayCategory: (category) => set({ displayCategory: category })
}));

interface SkillState {
  skillList: SkillArgs[];
  skillDisplayItem: SkillArgs | null;
  setSkillList: (list: SkillArgs[]) => void;
  setSkillDisplayItem: (item: SkillArgs) => void;
}

export const useSkillStore = create<SkillState>((set) => ({
  skillList: [],
  setSkillList: (list) => set({ skillList: list }),
  skillDisplayItem: null,
  setSkillDisplayItem: (item) => set({ skillDisplayItem: item })
}));

interface CategoryState {
  categoryList: CategoryArgs[];
  setCategoryList: (list: CategoryArgs[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categoryList: [],
  setCategoryList: (list) => set({ categoryList: list })
}));
