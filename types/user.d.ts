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
};

export type MessageArgs = {
  id?: number;
  userId: number | undefined;
  aiMsg: string;
  userMsg: string;
  time?: string;
  category?: number;
  type: 'insight' | 'skill';
};
