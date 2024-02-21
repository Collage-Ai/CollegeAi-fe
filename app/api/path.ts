// pages/api/[...path].js
console.log('File: app/api/[...path].ts');

export default async function handler(req: any, res: any) {
  const {
    query: { path },
    method,
    body,
    headers
  } = req;

  // 组装后端服务的 URL
  const backendUrl = `http://localhost:3000/api/${path.join('/')}`;
  console.log('backendUrl', backendUrl);
  try {
    // 使用 fetch API 向后端服务转发请求
    const response = await fetch(backendUrl, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
        // 如果需要，添加其他必要的头部，如认证信息
      },
      body: JSON.stringify(body)
    });

    // 等待后端响应
    const data = await response.json();

    // 将后端响应的数据和状态码转发回客户端
    res.status(response.status).json(data);
  } catch (error) {
    // 处理请求失败的情况
    console.error('Request failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
