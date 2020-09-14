import request from '@/utils/request';
import { stringify } from 'qs';
import { ResponseType } from '@/types/type';

const APP_URI = 'http://192.168.89.72:8820/api';
export interface GetDataType {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
}

export function getData(): Promise<ResponseType<GetDataType>> {
  return request<ResponseType<GetDataType>>(
    'https://jsonplaceholder.typicode.com/todo1s/1',
  );
}

// 获取活动列表
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function search({ query }) {
  return request(`${APP_URI}/1.0/portal/430156/activities?${stringify(query)}`);
}
