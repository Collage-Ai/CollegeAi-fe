import { aiAnalysis } from './components/ai';

export type CollegeStage =
  | '高中'
  | '大专'
  | '二本'
  | '一本'
  | '985'
  | '211'
  | '其他';

export type UserBaseInfo = {
  id?: number;
  avatar?: string;
  phone: string;
  username: string;
  education: string; //学历
  major: string; //专业
  career: string; //职业方向
  collegeStage: string; //院校层次
  careerExplore: string; //职业探索
  advantage: string; //个人优势
  email: string;
  password: string;
  skillPoint1: skillPoint; //技能点1
  skillPoint2: skillPoint;
  skillPoint3: skillPoint;
  stageAnalysis: aiAnalysis; //阶段分析
};

export type skillPoint = {
  skill: {
    活动1: unknown;
    活动2: unknown;
    活动3: unknown;
  };
};

export type MessageArgs = {
  id?: number;
  userId: number | undefined;
  aiMsg: string;
  userMsg: string;
  time: string;
  category: number;
  type: 'insight' | 'skill';
};
