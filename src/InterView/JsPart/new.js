/* eslint-disable no-extend-native */
import React from 'react';

export default function New() {
  function fun(name) {
    this.name = name;
  }

  function myNew(fun, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, fun.prototype);
    const res = fun.apply(obj, args);

    return res instanceof Object ? res : obj;
  }

  fun.prototype.say = function () {
    console.log(this.name);
  };

  const obj = myNew(fun, 'gg');
  obj.say();
  console.log(obj);

  return <div>new</div>;
}
