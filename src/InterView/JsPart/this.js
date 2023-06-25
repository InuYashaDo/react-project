/* eslint-disable */
import React from 'react';

export default function BindThis(props) {
  function test(a, b, c, d, e) {
    const res = a + b;
    console.log(this, a, b, c, d, e);
    return res;
  }

  // case1 内部使用apply实现
  Function.prototype.myBindApply = function (context) {
    if (typeof this !== 'function') {
      return new TypeError('error');
    }

    const that = this;

    // 获取参数
    const args = [...arguments].slice(1);

    return function fn() {
      console.log(this);
      return that.apply(
        this instanceof fn ? new that(...arguments) : context,
        args.concat(...arguments)
      );
    };
  };

  // case2 内部使用call实现
  Function.prototype.myBindCall = function (context, ...args) {
    if (typeof this !== 'function') {
      return new TypeError('error');
    }

    const that = this;

    return function (...rest) {
      return that.call(context, ...args, ...rest);
    };
  };

  // const testBindApply = test.myBindApply({ test: 'hh' }, 1, 2);
  const testBindCall = test.myBindCall({ test: 'xx' }, 1, 2);

  // testBindApply(3);
  // testBindCall(3);

  // test.myBind({ a: 'hh' }, 3, 4);

  Function.prototype.myCall = function (context, ...args) {
    if (context === null || context === undefined) {
      context = window;
    }

    context = typeof context === 'object' ? context : {};

    let key = Math.random();

    while (context[key]) {
      key = Math.random();
    }

    context[key] = this;

    const result = context[key](...args);
    delete context[key];

    return result;
  };

  // test.myCall({a:'ii'},1,2,3)

  Function.prototype.myApply = function (context, args = []) {
    if (!Array.isArray(args)) throw '参数必须为数组';

    if (context === null || context === undefined) {
      context = window;
    }

    context = typeof context === 'object' ? context : {};

    let key = Math.random();
    while (context[key]) {
      key = Math.random();
    }

    context[key] = this;
    const result = context[key](...args);
    delete context[key];

    return result;
  };

  Function.prototype.selfCall = function (context, ...args) {
    const _this = Symbol('this');

    if (!context || typeof context !== 'object') {
      context = window;
    }

    context[_this] = this;

    const res = context[_this](...args);
    delete context[_this];
    return res;
  };

  Function.prototype.selfApply = function (context, arg) {
    if (!Array.isArray(arg)) throw '参数必须为数组';
    if (!context) context = window;

    console.log(arg);

    typeof context === 'object' ? context : {};

    const _this = Symbol('this');
    context[_this] = this;

    const res = context[_this](...arg);
    delete context[_this];

    return res;
  };

  Function.prototype.selfBind = function (context) {
    if (typeof this !== 'function') {
      return new TypeError('error');
    }

    const that = this;
    return function (...rest) {
      return that.call(context, ...args, ...rest);
    };
  };

  test.selfApply({ test: 'll' }, [3, 3, 3]);

  Function.prototype.myBind = function (_this, ...args) {
    const that = this;

    return function fn(...rest) {
      const _fn = Symbol('fn');
      _this.__proto__[_fn] = that;

      const res = _this[_fn](...args, ...rest);
      delete _this.__proto__[_fn];
      return res;
    };
  };

  const _obj = { test: 1 };
  const bindFun = test.myBind(_obj, [1, 2, 3]);
  bindFun();
  bindFun([5]);
  // console.log(_obj);

  // const res = test.selfCall({ test: 'll' }, 1, 2, 3, 4);
  // console.log(res);

  return <div>bindThis</div>;
}
