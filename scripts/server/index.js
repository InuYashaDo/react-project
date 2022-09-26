const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../config/webpack.dev');
const { SERVER_HOST, SERVER_PORT } = require('../conf');
const logger = require('./logger');
const choosePort = require('./chooseport');

const compiler = Webpack(webpackDevConfig);

const devServerOptions = {
  ...webpackDevConfig.devServer,
};

const server = new WebpackDevServer(compiler, devServerOptions);

async function startServer() {
  const resPort = await choosePort(SERVER_PORT, SERVER_HOST);
  try {
    if (resPort !== null) {
      server.listen(resPort, SERVER_HOST, err => {
        if (err) {
          return logger.error(err.message);
        }
        return logger.start(resPort, SERVER_HOST);
      });
    }
  } catch (error) {
    logger.error(error);
  }
}
startServer();
