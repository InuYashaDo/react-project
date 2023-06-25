import React from 'react';

export default function Async() {
  // async和await实现
  function asyncFn() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('哈哈 前面');
      }, 3000);
    });
  }

  function* dispatcher() {
    const result = yield asyncFn();
    console.log(result);
    console.log('哈哈 后面');
  }

  const generator = dispatcher();

  function runAsyncDispatcher() {
    const workInProgress = generator.next();
    if (workInProgress.done) {
      return;
    }

    if(workInProgress.value instanceof Promise) {
      workInProgress.value.then(data => {
        generator.next(data);
        runAsyncDispatcher()
      })
    }
  }

  runAsyncDispatcher();

  // generator实现
  // function* gen() {
  //   yield 1;
  //   yield 2;
  //   yield 3;
  //   console.log(111);
  // }

  // const g = gen();

  // console.log(g.next(), g.next(), g.next(), g.next());

  // iterator
  const testIterator = {};
  testIterator[Symbol.iterator] = function () {
    let index = 1;
    return {
      next() {
        return {
          value: (index += 1),
          done: index === 5,
        };
      },
    };
  };

  for (let iteratorKey of testIterator) {
    console.log(iteratorKey, '=====iteratorKey');
  }

  return <div>async</div>;
}
