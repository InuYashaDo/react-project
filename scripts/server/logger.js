const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('-----------------------------------');

const logger = {
  error: error => {
    console.error(chalk.red(error));
  },
  start: (port, host) => {
    console.log(`Server started!${chalk.green('✓')}`);
    console.log(`
    ${chalk.bold('APP running at:')}
    ${divider}
    -Local: ${chalk.blue(`   http://${host}:${port}`)}
    -Network: ${chalk.blue(`http://${ip.address()}:${port}`)}
    ${divider}
    ${chalk.magenta(`Press ${chalk.italic('CTRL+C | CMD+C')} to stop`)}
    `);
  },
};

module.exports = logger;
