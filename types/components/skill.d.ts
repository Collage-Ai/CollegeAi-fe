import { ActivityInfo } from './ai';

export type SkillArgs = {
  id?: number;
  userId: number;
  title: string;
  description: ActivityInfo;
  type?: string; //首页技能分类
  category: number; //是否归档
};
