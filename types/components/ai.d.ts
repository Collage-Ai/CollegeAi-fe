export type aiAnalysis = {
  分析结果: number;
  阶段特征: string;
  建议活动: string[];
};

// 定义活动信息的 TypeScript 类型
export type ActivityInfo = {
  活动名称: string;
  活动日期: string;
  活动地点: string;
  活动简介: string;
  参与方式: string;
  url: string;
};

// 定义数据可能是单个活动信息，也可能是活动信息数组的联合类型
export type ActivityData = {
  name: string;
  content: ActivityInfo[] | ActivityInfo;
};
