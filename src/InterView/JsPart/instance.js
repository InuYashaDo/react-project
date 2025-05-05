import React from 'react';

export default function Instance() {
  // 自定义instanceof
  function myInstance(left, right) {
    if (typeof left !== 'object' || left === null) return false;

    let proto = Object.getPrototypeOf(left);

    while (true) {
      if (proto === null) return false;
      if (proto === right.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
  }

  // 通用的类型检查方法
  function typeCheck(val) {
    let type = typeof val;
    if (type !== 'object') {
      console.log(type);
      return type;
    }

    type = Object.prototype.toString.call(val);

    // return type.replace(/^\[object (\S+)\]$/, '$1');
    console.log(type.replace(/^\[object (\S+)\]$/, '$1'));
  }

  const str = 'a';
  const arr = [];
  const bool = true;
  const num = 1;
  const obj = {};
  const fun = () => {};
  const sym = Symbol(1);

  typeCheck(str);
  typeCheck(arr);
  typeCheck(bool);
  typeCheck(num);
  typeCheck(obj);
  typeCheck(fun);
  typeCheck(sym);
  typeCheck(null);
  typeCheck();

  return <div>instance</div>;
}
