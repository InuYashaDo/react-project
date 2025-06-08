import React from 'react';

const store = {
  dispatch: () => {
    // console.log('this is store dispatch');
  },
};

export default function specialFun() {
  // function commonFun(a, b, c) {
  //   console.log(a, b, c);
  // }

  // const klhFun = (a) => (b) => (c) => {
  //   console.log(a, b, c);
  // };

  // // commonFun(1, 2, 3);
  // klhFun(1)(2)(3);

  function logAdd(s) {
    let next = s.dispatch;
    return () => {
      let res = next();
      console.log('this is logAdd');
      return res;
    };
  }

  function errorAdd(s) {
    let next = s.dispatch;
    return () => {
      let res = next();
      console.log('this is errorAdd');
      return res;
    };
  }

  function applyMiddleware(s, middlewares) {
    middlewares.forEach((m) => {
      s.dispatch = m(s);
    });
  }

  // errorAdd(store);
  // logAdd(store);

  applyMiddleware(store, [logAdd, errorAdd]);

  store.dispatch();

  return <div>specialFun</div>;
}
