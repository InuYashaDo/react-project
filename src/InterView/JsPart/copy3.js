import React from 'react';

export default function Copy3() {
  // 数据类型
  /**
   * 1.obj
   * 2.Date
   * 3.Fun
   * 4.Reg
   * 5.Symbol
   * 8.循环引用
   * 6.null
   * 7.undefined
   * 9.string
   * 10.number
   * 11.arr
   * 12.Boolean
   *
   */

  const loopObj = {
    childLoop: {
      name: 'childName',
    },
  };

  loopObj.childLoop.loop = loopObj;

  const _obj = {
    firObj: {
      name: 'fir',
      child: {
        sec: {
          name: 'sec',
        },
      },
    },
    date: new Date(),
    fun: () => {},
    reg: new RegExp(),
    sym: Symbol('111'),
    loopObj,
    nu: null,
    und: undefined,
    str: '哈哈',
    num: 1,
    arr: [1, 2, 3],
    bool: true,
  };

  // 深拷贝
  // 1. JSON.stringify() 优点：简单方便； 缺点：循环引用会报错、会忽略symbol、undefined和function的序列化
  // const newObj = JSON.parse(JSON.stringify(obj));

  // 2.手动递归
  const myDeepCopy = (deepObj, hash = new WeakMap()) => {
    if (typeof deepObj !== 'object') return deepObj;

    if (deepObj === null) return null;

    if (deepObj instanceof Date) return new Date(deepObj);

    if (deepObj instanceof RegExp) return new RegExp(deepObj);

    if (hash.has(deepObj)) {
      return hash.get(deepObj);
    }

    const allDesc = Object.getOwnPropertyDescriptors(deepObj);
    const cloneObj = Object.create(Object.getPrototypeOf(deepObj), allDesc);

    hash.set(deepObj, cloneObj);

    for (let key of Object.keys(cloneObj)) {
      cloneObj[key] = myDeepCopy(cloneObj[key], hash);
    }

    return cloneObj;
  };

  const newObj = myDeepCopy(_obj);

  console.log(newObj, _obj);

  return <div>C</div>;
}
