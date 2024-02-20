export async function aIResponse(message: string) {
  const aiApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    //对，外部服务不要使用request，而是使用fetch
    const response = await fetch(aiApiUrl ?? '', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`, // 使用你的OpenAI API密钥
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error('AI Service Error:', error);
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid API key');
    }
    throw new Error('Unable to get response from AI service');
  }
}
type ThrottleFunction = (...args: any[]) => void;

function throttle(func: ThrottleFunction, limit: number) {
  let inThrottle = false;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export const getAIResponse = throttle(aIResponse, 1000);
