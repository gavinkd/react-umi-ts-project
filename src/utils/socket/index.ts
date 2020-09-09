import {
  WebSocketsConfigType,
  WebSocketClassEventType,
  SendMessageType,
} from './index.d';

function checkParams(config: WebSocketsConfigType) {
  if (!config.url) {
    throw new Error('url is not found');
  }
}

// websocket
class WebSocketClass implements WebSocketClassEventType {
  private socketInstance: WebSocket | undefined;
  private readonly socketConfig: WebSocketsConfigType | undefined;

  constructor(config: WebSocketsConfigType) {
    checkParams(config);
    if (config?.url) {
      this.connect(config);
      this.socketConfig = config;
    }
  }

  // 建立连接
  connect(config: WebSocketsConfigType) {
    if (!this.socketInstance) {
      this.socketInstance = new WebSocket(config.url, config.port);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.socketInstance.onmessage = (ev: MessageEvent): any => {
        config.onmessage && config.onmessage(ev);
      };
      this.socketInstance.onopen = ev => {
        config.onopen && config.onopen(ev);
      };
    }
  }

  // 关闭连接
  close() {
    if (this.socketInstance) {
      this.socketInstance.close();
    }
  }

  // 获取实例
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  getInstance() {
    if (!this.socketInstance && this.socketConfig) {
      this.socketInstance = new WebSocket(
        this.socketConfig.url,
        this.socketConfig.port,
      );
    }
    return this.socketInstance;
  }

  // 发送数据
  send(message: string, type?: SendMessageType, cb?: () => void) {
    if (this.socketInstance) {
      let tempMessage: SendMessageType = '';
      if (type === 'json') {
        tempMessage = JSON.stringify(tempMessage);
      } else {
        tempMessage = message;
      }

      this.socketInstance.send(tempMessage);
      cb && cb();
    }
  }
}

export default WebSocketClass;
