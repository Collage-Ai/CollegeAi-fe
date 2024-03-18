import { aiAnalysis } from '@/types/components/ai';
import { UserBaseInfo } from '@/types/user';
import { getWebAIResponse } from './fetcher';

let lastCallTime: number = 0;
let debounceTimer: NodeJS.Timeout;

type getAIResponseProps = {
  message: string;
  isWeb?: boolean;
};

export async function getAIResponse({
  message,
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
            messages: [{ role: 'user', content: message }]
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
