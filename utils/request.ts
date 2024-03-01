import { getCookie } from './cookie';
import { getApiUrl } from './helpers';
import toast from '@/components/toast/toast';

interface RequestOptions extends RequestInit {
  responseType?:
    | 'TEXT'
    | 'JSON'
    | 'BLOB'
    | 'ARRAYBUFFER'
    | 'text'
    | 'json'
    | 'blob'
    | 'arraybuffer';
  body?: any;
}

// 发送数据请求
const request = async (url: string, config?: RequestOptions) => {
  const finalUrl: string = `${process.env.BACKEND_URL}/api${url}`;
  const inital: RequestOptions = {
    method: 'GET',
    body: null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') ? 'Bearer ' + getCookie('token') : '',
      'Access-Control-Allow-Origin': '*'
    },
    credentials: 'include',
    cache: 'no-cache',
    mode: 'cors',
    responseType: 'JSON'
  };

  const configs: RequestOptions = {
    ...inital,
    ...config
  };
  if (config && config.headers)
    configs.headers = {
      ...inital.headers,
      Authorization: getCookie('token') ? 'Bearer ' + getCookie('token') : '',
      ...config.headers
    };

  // 基于fetch请求数据
  const finalConfig: RequestInit = {
    method: configs.method?.toUpperCase(),
    credentials: configs.credentials,
    mode: configs.mode,
    cache: configs.cache,
    headers: configs.headers,
    body: configs.body
  };

  return fetch(`${finalUrl}`, finalConfig)
    .then((response: Response) => {
      // 走到这边不一定是成功的：
      // Fetch的特点的是，只要服务器有返回结果，不论状态码是多少，它都认为是成功
      const { status } = response;

      if (status >= 200 && status < 400) {
        // 真正成功获取数据
        let result: any;
        switch (configs.responseType && configs.responseType.toUpperCase()) {
          case 'TEXT':
            result = response.text();
            break;
          case 'JSON':
            result = response.json();
            break;
          case 'BLOB':
            result = response.blob();
            break;
          case 'ARRAYBUFFER':
            result = response.arrayBuffer();
            break;
          default:
            result = response.json();
        }
        return result;
      }
      // 失败的处理
      return response.json().then((errorResponse) => {
        toast.error(errorResponse.msg, { id: `status${status}` });
        return Promise.reject({ response, errorResponse });
      });
    })
    .catch((reason: any) => {
      // @2:断网
      if (typeof window !== 'undefined' && navigator && !navigator.onLine) {
        toast.error('你的网络好像断开了', { id: 'offline' });
      }
      // @1:状态码失败
      if (reason && reason.status) {
        if (reason.errorResponse.msg) {
          toast.error(reason.errorResponse.msg);
        } else {
          switch (reason.status) {
            case 400:
              toast.error('请确认你的信息！', { id: 'status400' });
              break;
            case 401:
              toast.error('请先登录！', { id: 'status401' });
              break;
            case 403:
              toast.error('暂无权限获取', { id: 'status403' });
              break;
            case 500:
              toast.error('发生了一些错误，请稍后重试', { id: 'status500' });
              break;
            case 504:
              toast.error('发生了一些错误，请稍后重试', { id: 'status504' });
              break;
            default:
          }
        }
      } else {
        // @3:处理返回数据格式失败
        toast.error('发生了一些错误，请稍后重试', { id: 'status500' });
      }

      return Promise.reject(reason);
    });
};

export default request;
