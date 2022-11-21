// 统一请求
import request from 'umi-request';
import portalToast from '@/components/Toast';
import { HTTP_CODE_MESSAGE } from '@/dictionary';

// URL 添加t 的时间戳
function addTimestampToUrl(url: string): string {
  const t: number = +new Date();
  if (url.indexOf('?') !== -1) {
    return `${url}&t=${t}`;
  } else {
    return `${url}?t=${t}`;
  }
}

request.interceptors.request.use((url, options) => {
  return {
    url: addTimestampToUrl(url),
    options: { ...options, interceptors: true },
  };
});

request.interceptors.response.use(response => {
  return response.json();
});

export default request;
