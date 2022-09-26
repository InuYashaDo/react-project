import axios from 'axios';

function request(url: string, options?: object) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      ...options,
    })
      .then(res => {
        const { data, status } = res;
        if (status === 200) {
          const { data: content, code, msg } = data;
          if (code === 0 || code === 200) {
            return resolve(content);
          }
          return reject(msg || '服务器错误');
        } else {
          return reject('error');
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
}
export default request;
