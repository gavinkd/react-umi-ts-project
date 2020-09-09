declare module 'goeasy' {
  interface GoEasyConstructor {
    new (config: GoEasyConfigType): GoEasyConfigType;
  }

  interface GoEasyConfigType {
    host: string;
    appkey: string;
    onConnected(): void;
    onDisconnected(): void;
    onConnectFailed(error: any): void;
  }

  // class GoEasy implements GoEasyConstructor {
  //   new() {}
  // }

  // eslint-disable-next-line no-inner-declarations
  // function createGoEasy(ctor: GoEasyConstructor, config: GoEasyConfigType): GoEasyConfigType {
  //   return new ctor(config)
  // }
  //
  // const goEasy = createGoEasy(GoEasy, {})
  // export default  goEasy
}
