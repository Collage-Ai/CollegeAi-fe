import { aiAnalysis } from '@/types/components/ai';
import { UserBaseInfo } from '@/types/user';
import { getWebAIResponse } from './fetcher';

let lastCallTime: number = 0;
let debounceTimer: NodeJS.Timeout;

type getAIResponseProps = {
  message: string;
  promptMessage?: object[];
  isWeb?: boolean;
};

export async function getAIResponse({
  message,
  promptMessage,
  isWeb = false
}: getAIResponseProps): Promise<any> {
  const minimumInterval = 1000; // 设置最小请求间隔为1000毫秒
  const currentTime = new Date().getTime();

  // 检查距离上一次请求是否已经超过最小间隔时间
  if (currentTime - lastCallTime < minimumInterval) {
    throw new Error('请求过于频繁，请稍后再试');
  }

  // 清除之前的定时器（如果存在）
  if (debounceTimer) clearTimeout(debounceTimer);

  return new Promise((resolve, reject) => {
    debounceTimer = setTimeout(async () => {
      try {
        if (isWeb) return await getWebAIResponse(message);
        const aiApiUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const response = await fetch(aiApiUrl ?? '', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`, // 使用你的OpenAI API密钥
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              promptMessage && [...promptMessage],
              { role: 'user', content: message }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        lastCallTime = new Date().getTime(); // 更新上一次成功请求的时间
        resolve(data.choices[0].message.content);
      } catch (error) {
        console.error('AI Service Error:', error);
        reject(error);
      }
    }, minimumInterval); // 设置防抖时间，与最小请求间隔相同
  });
}

/**
 * @description 询问ai,对用户阶段进行分析
 * @param {UserBaseInfo} user 用户信息
 * @returns {Promise<string>} ai回复
 */
export async function getAIAnalysis(user: UserBaseInfo): Promise<aiAnalysis> {
  const message = `用户信息：${JSON.stringify(user)}`;
  const promptMessage = [
    {
      role: 'system',
      content: `输入:

学生的基本信息（年级、学校、已经完成的实习、职业目标、兴趣和技能）
要求:

根据输入信息，判断学生当前所处的职业发展阶段（探索、试探、确定、过渡）。
描述该阶段的主要特征。
提供针对该学生的具体建议，包括他们接下来应该参与的活动以进一步发展其职业生涯。
示例输入:

学生信息：大三学生，985大学，已完成运营和产品实习，职业目标为产品经理，对探索人性和产品感兴趣，具有一定的技术基础。
预期输出:

{
    "分析结果": "学生目前处于确定阶段。",
    "阶段特征": "学生对未来职业有明确认识，开始积极准备职业生涯的启动。",
    "建议活动": [
        "进一步学习专业课程，深化对产品管理领域的理解。",
        "参与更多实习或研究项目，尤其是与产品管理相关的，以获得实际工作经验。",
        "参加行业网络活动和讲座，与业内人士交流，扩大职业联系。"
    ]
}
请使用json格式输出结果`
    }
  ];
  return await getAIResponse({ message, promptMessage });
}
