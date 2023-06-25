import React from 'react';

export default function Extends3() {
  // 原型链继承
  /*
   * 优点：代码简单、可以继承原型上的属性和方法
   * 缺点：多个实例共用同一个原型对象产生干扰、在创建子类时无法向父类构造传参，即没有实现super的功能
   *
   */
  // function Parent(name) {
  //   this.name = name;
  //   this.parentName = name;
  //   this.parentObj = {
  //     name,
  //   };

  //   this.sayName = function () {
  //     return this.name;
  //   };

  //   this.setName = function (name) {
  //     this.parentObj.name = name;
  //   };
  // }

  // Parent.prototype.protoName = '哈哈';

  // function Child(name) {
  //   this.name = name;
  // }

  // Child.prototype = new Parent('嘻嘻');

  // const child1 = new Child('哈哈');
  // const child2 = new Child('kk');
  // // child1.setName('child1 更新');
  // // child2.setName('child2 更新');
  // child1.parentObj.name = 'child1 更新父实例对象';
  // child2.parentObj.name = 'child2 更新父实例对象';
  // child1.protoName = 'child1 更新原型name';
  // child2.protoName = 'child2 更新原型name';

  // console.log(child1.parentName);
  // console.log(child2.parentName);

  // console.log(child1.parentObj);
  // console.log(child2.parentObj);

  // console.log(child1.protoName);
  // console.log(child2.protoName);

  // 构造函数继承
  /**
   *
   * 优点：每个实例都有不同的原型对象、能够给父类构造函数传参
   * 缺点：不能继承父类原型上的属性和方法
   *
   */
  // function Parent(name) {
  //   this.name = name;
  //   this.parentObj = {
  //     name,
  //   };
  // }

  // Parent.prototype.sayName = function () {
  //   return this.name;
  // };

  // function Child(...others) {
  //   Parent.call(this, ...others);
  // }

  // Child.constructor = Child;

  // const child1 = new Child('hh');
  // const child2 = new Child('xx')

  // console.log('====================================');
  // console.log(child1,child2);
  // console.log('====================================');

  // 寄生组合继承
  function Parent(name) {
    this.name = name;
    this.parentObj = {
      name,
    };
  }

  Parent.prototype.sayName = function () {
    return this.name;
  };

  Parent.prototype.protoObj = {
    protoName: '哈哈',
  };

  function Child(...others) {
    Parent.call(this, ...others);
  }

  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  // Child.prototype = Parent.prototype;

  const parent = new Parent('parent')

  const child1 = new Child('hh');
  const child2 = new Child('xx');

  child1.protoObj.protoName = 'child1 更改原型protoName';
  child2.protoObj.protoName = 'child2 更改原型name';
  

  console.log(child1, child2, parent);

  return <div>extends3</div>;
}
