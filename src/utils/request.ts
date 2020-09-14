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
  const { ok, status } = response;
  if (status !== 200) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // portalToast.error(HTTP_CODE_MESSAGE[status]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // throw Error(HTTP_CODE_MESSAGE[status])
  }
  return response.json();
});

export default request;
