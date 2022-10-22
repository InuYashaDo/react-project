import React from 'react';

export default function Throttle() {
  const timeThrottle = (fun, delay) => {
    let oldDate = new Date();

    return () => {
      if (new Date() - oldDate >= delay) {
        fun();
        oldDate = new Date();
      }
    };
  };

  const timeoutThrottle = (fun, delay) => {
    let timer = null;
    return () => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        fun();
        timer = null;
      }, delay);
    };
  };

  const throttle = (fun, delay) => {
    let oldDate = new Date();
    let timer = null;

    return () => {
      clearTimeout(timer);

      if (new Date() - oldDate >= delay) {
        fun();
        oldDate = new Date();
        return;
      }

      timer = setTimeout(() => {
        fun();
      }, delay);
    };
  };

  const recThrottle = (fun, delay) => {
    let waitFun = null;
    let canCall = true;

    return () => {
      if (!canCall && fun) {
        waitFun = fun;
        return;
      }

      fun();
      canCall = false;

      setTimeout(() => {
        canCall = true;
        if (waitFun) {
          recThrottle(waitFun);
          waitFun = null;
        }
      }, delay);
    };
  };

  const handleClick = (val) => {
    console.log(`我被点击了，传入的参数为${val}`);
  };

  return (
    <div>
      case1:使用时间差
      <div
        style={{
          height: 50,
          width: 50,
          background: 'red',
          textAlign: 'center',
          lineHeight: '50px',
        }}
        onClick={timeThrottle((a = 1) => handleClick(a), 1000)}
      >
        点击我
      </div>
      case2:使用setTimeout
      <div
        style={{
          height: 50,
          width: 50,
          background: 'green',
          textAlign: 'center',
          lineHeight: '50px',
        }}
        onClick={timeoutThrottle((a = 1) => handleClick(a), 1000)}
      >
        点击我
      </div>
      case3:两者结合
      <div
        style={{
          height: 50,
          width: 50,
          background: 'blue',
          textAlign: 'center',
          lineHeight: '50px',
        }}
        onClick={throttle((a = 1) => handleClick(a), 1000)}
      >
        点击我
      </div>
      case4:纯setTimeout实现立即调用及最后一次调用
      <div
        style={{
          height: 50,
          width: 50,
          background: 'pink',
          textAlign: 'center',
          lineHeight: '50px',
        }}
        onClick={recThrottle((a = 1) => handleClick(a), 1000)}
      >
        点击我
      </div>
    </div>
  );
}
