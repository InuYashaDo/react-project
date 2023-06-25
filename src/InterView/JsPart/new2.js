import React from 'react';

export default function New2() {
  function myNew(constructor, ...args) {
    if (typeof constructor !== 'function') {
      throw TypeError('Constructor is not function');
    }

    const obj = Object.create(constructor.prototype);

    const res = constructor.call(obj, ...args);

    if (typeof res === 'object' && res !== null) return res;

    return obj;
  }

  function testA(name) {
    this.name = name;
  }

  function testB(name) {
    const obj = {value:'西溪'};
    obj.name = name;
    this.name = name;
    return obj;
  }

  const objA = myNew(testA, '哈哈');
  const objB = myNew(testB, '哈哈');

  console.log('====================================');
  console.log(objA, objB);
  console.log('====================================');

  return <div>new2</div>;
}
