import React from 'react';

export default function Instance2() {
  function myInstance(left, right) {
    if (typeof left !== 'object' || left === null) return false;

    let proto = Object.getPrototypeOf(left);
    while (true) {
      if (!proto) return false;
      if (proto === right.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
  }

  const isInstance = myInstance({ a: 1 }, Object);

  function typeCheck(val) {
    let type = typeof val;
    if (type !== 'object') {
      console.log(type, 'common');
      return type;
    }

    if (val === null) {
      console.log(null, 'null');
      return null;
    }

    type = Object.prototype.toString.call(val);

    type = type.replace(/^\[object (\S+)\]$/, '$1').toLowerCase();

    console.log(type, 'object=======');
  }

  const str = 'a';
  const num = 1;
  const und = undefined;
  const nul = null;
  const bool = true;
  const sym = Symbol(1);
  const arr = Array([]);
  const obj = {};
  const fun = () => {};

  typeCheck(str);
  typeCheck(num);
  typeCheck(und);
  typeCheck(nul);
  typeCheck(bool);
  typeCheck(sym);
  typeCheck(arr);
  typeCheck(obj);
  typeCheck(fun);
  typeCheck(null);
  typeCheck();

  return <div>instance2</div>;
}
