const express = require('express');
const expressWs = require('express-ws');
const router = express.Router();
expressWs(router);

const nameList = ['张三', '李四', '哈哈', 'cc'];

router.ws('/test', async (ws, req) => {
  ws.send('连接成功');
  let interval;
  // 连接成功后使用定时器定时向客户端发送数据，同时要注意定时器执行的时机，要在连接开启状态下才可以发送数据

  function test() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  // for (let i = 0; i < nameList.length; i++) {
  //   const name = nameList[i];
  //   if (ws.readyState === ws.OPEN) {
  //     await test(name);
  //     ws.send(name);
  //     // setTimeout(() => {
  //     //   ws.send(name);
  //     // },5000)
  //   } else {
  //     clearInterval(interval);
  //   }
  // }

  // nameList.map(async name => {
  //   if (ws.readyState === ws.OPEN) {
  //     await test(name);
  //     ws.send(name);
  //     // setTimeout(() => {
  //     //   ws.send(name);
  //     // },5000)
  //   } else {
  //     clearInterval(interval);
  //   }
  // });
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(`服务器发送消息：${Math.random().toFixed(2)}`);
    } else {
      clearInterval(interval);
    }
  }, 1000);
  // 监听客户端发来的数据，直接将信息原封不动返回回去
  ws.on('message', msg => {
    ws.send(`服务器接收到客户端发来的消息：${msg}`);
  });
});

module.exports = router;
