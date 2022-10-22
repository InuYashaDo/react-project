import React from 'react';

export default function Copy() {
  // 浅拷贝
  // function shallowCopy(obj) {
  //   // case1 扩展运算符；
  //   // 优点：1.方便，
  //   // return { ...obj };

  //   // case2 使用Object的assign方法 只拷贝自身可枚举属性，同时不可拷贝自身set和get方法
  //   // return Object.assign({}, obj);

  //   // case3 使用Object的getOwnPropertyDescriptor和defineProperties
  //   // return Object.defineProperties(obj, Object.getOwnPropertyDescriptors(obj));

  //   // case4 使用Object.create和Object.getPrototype实现
  //   return Object.create(
  //     Object.getPrototypeOf(obj),
  //     Object.getOwnPropertyDescriptors(obj)
  //   );

  //   // case5 使用for in遍历
  //   const newObj = {};
  //   for (let objKey in obj) {
  //     if (obj[objKey]) {
  //       newObj[objKey] = obj[objKey];
  //     }
  //   }
  //   return newObj;
  // }

  // const parentObj = {
  //   fun: () => {
  //     console.log(1);
  //   },
  // };

  // const originObj = {
  //   a: 1,
  //   set foo(val) {
  //     this.a = val;
  //   },
  //   test: () => {
  //     console.log(this.name);
  //   },
  //   [Symbol('b')]: 1,
  // };

  // Object.setPrototypeOf(originObj, parentObj);

  // const copyObj = shallowCopy(originObj);

  // console.log(copyObj, copyObj.fun);

  // 深拷贝
  function deepCopy(obj, hash = new WeakMap()) {
    // case1 Json.stringify()
    // return JSON.parse(JSON.stringify(obj));

    // case2 递归对象
    if (obj === null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== 'object') return obj;

    if (hash.get(obj)) return hash.get(obj);

    let cloneObj = new obj.constructor();
    hash.set(obj, cloneObj);

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = deepCopy(obj[key], hash);
      }
    }

    return cloneObj;
  }

  const obj = {
    a: 1,
    b: {
      c: 2,
    },
    b: { e: 3 },
    fun: () => {
      console.log(this.b.c);
      return this.b.c;
    },
    e: undefined,
    f: null,
    [Symbol('g')]: 'hh',
  };

  // console.log(obj.b);

  const resObj = deepCopy(obj);

  resObj.b.c = 3;

  console.log(resObj, obj);

  return <div>copy</div>;
}
