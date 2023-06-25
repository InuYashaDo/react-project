import React from 'react';

export default function Others() {
  // 如何顺序执行十个异步函数？
  // 方法一：for + setTimeout
  // function printNum(i) {
  //   console.log('now num', i);
  // }

  // async function fun() {
  //   for (let i = 0; i < 10; i++) {
  //     await new Promise((resolve) => {
  //       setTimeout(() => {
  //         printNum(i);
  //         resolve();
  //       });
  //     });
  //   }
  // }

  // fun();

  // 使用reduce;
  const funList = new Array(5).fill((i) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(i);
        resolve(i);
      });
    });
  });

  funList.reduce(async (preVal, nowFun, nowInx) => {
    await preVal;
    return nowFun(nowInx);
  }, 0);

  // function repeat(fun, times, delay) {
  //   return async (str) => {
  //     for (let i = 0; i < times; i++) {
  //       await new Promise((resolve) => {
  //         setTimeout(() => {
  //           fun(str);
  //           resolve();
  //         }, delay);
  //       });
  //     }
  //   };
  // }

  // // 使下面调用代码能正常工作
  // const repeatFunc = repeat(console.log, 4, 3000);
  // repeatFunc('hello world'); //会输出4次 hello world, 每次间隔3秒

  // [1, 2, 3, 4].map((item) => {});

  return <div>others</div>;
}
