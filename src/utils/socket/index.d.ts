type SendMessageType = string | number | 'json';

export interface EventData<T> {
  data: T;
}

export interface WebSocketClassConstructorType {
  new (config: WebSocketsConfigType): WebSocket;
}

export interface WebSocketsConfigType {
  url: string;
  port?: string | Array<string>;
  onmessage: (event: MessageEvent) => void;
  onopen?: (ev: Event) => void;
}

export interface WebSocketClassEventType {
  connect(config: WebSocketsConfigType): void;
  close(): void;
  getInstance(): WebSocketClassConstructorType;
  send(message: string, type?: SendMessageType, cb?: () => void): void;
}
