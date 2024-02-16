export async function getAIResponse(message: string) {
  const aiApiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;

  try {
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
