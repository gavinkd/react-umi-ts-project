import request from '@/utils/request';
import { ResponseType } from '@/types/type';

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
