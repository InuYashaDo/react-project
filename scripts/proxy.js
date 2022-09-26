module.exports = proxySettings = {
  '/api': {
    target: 'http://aly-test.api.xiaoyuanhao.com/nbugs-file-server-test/file/getStsToken',
    changeOrigin: true,
  },
  '/api-2': {
    target: 'http://aly-test.api.xiaoyuanhao.com/nbugs-file-server-test/file/getStsToken',
    changeOrigin: true,
    pathRewrite: {
      '^/api2': '',
    },
  },
};
