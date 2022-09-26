import request from './request';

const baseUrl = 'http://aly-test.api.xiaoyuanhao.com';

export const requestA = (url: string, data?: object) => {
  return request(url, data);
};

export const requestB = () => {};
