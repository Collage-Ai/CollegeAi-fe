export enum ChatCategory {
  '定义与范围' = 1,
  '历史发展' = 2,
  '当前状态' = 3,
  '主要参与者' = 4,
  '增长领域' = 5,
  '消费者需求' = 6,
  '新兴技术' = 7,
  '技术应用' = 8,
  '典型职位' = 9,
  '技能需求' = 10,
  '薪酬范围' = 11,
  '工作强度' = 12,
  '职业满意度' = 13,
  '文化与价值观' = 14,
  '行业法规' = 15,
  '政策支持' = 16,
  '全球市场影响' = 17,
  '跨国公司作用' = 18
}
export type ChatCategoryType = keyof typeof ChatCategory;
