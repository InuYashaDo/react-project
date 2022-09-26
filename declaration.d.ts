import axios from 'axios';

declare module 'axios' {
  export interface AxiosResponse<T = any> {
    data: T; // 服务端返回的数据
    status: number; // HTTP 状态码
    statusText: string; // 状态消息
    headers: any; // 响应头
    config: AxiosRequestConfig; // 请求配置对象
    request: any; // 请求的 XMLHttpRequest 对象实例
  }
}

declare module '*.less' {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
  declare module '*.less'
}
