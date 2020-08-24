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
