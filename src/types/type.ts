import { HeaderProps } from '@/components/Header';
export interface ResponseType<T> {
  data: T;
  message: string;
  code: number;
  pagination?: Array<number>;
}

export interface PayLoadType<T> {
  payload: T;
  type: unknown;
}

export interface PAGE_DICTIONARY_TYPE {
  pathname: string;
  title: string;
  description: string;
  headerConfig: HeaderProps;
}
