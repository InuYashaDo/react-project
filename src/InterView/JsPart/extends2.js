import React from 'react';

export default function extends2() {
  // 原型链继承
  /*
    总结：
    优点：
      1. 实现简单
      2. 可以继承原型上的属性和方法
    缺点
      1. 不能给父类构造函数传参
      2. 由于是原型链继承，多个实例使用的是同一个原型对象
   */
  // const protoExtends = () => {
  //   function Parent() {
  //     this.name = 'parent';

  //     this.say = () => {
  //       console.log('my name is parent');
  //     };
  //   }

  //   Parent.prototype.protoName = 'protoName'

  //   function Son() {}

  //   Son.prototype = new Parent();

  //   const _son = new Son();

  //   console.log(_son);
  // };

  // protoExtends();

  // 借助call
  /*
    总结：
    优点
      1. 可以给父类传参
      2. 构造出来的都是独立的实例，不会用重复引用的问题
    缺点
      1. 每次都会调用父类的构造函数，难以实现方法的复用
      2. 不能继承原型上的属性和方法
   */
  // const callExtends = () => {
  //   function Parent(paramsName) {
  //     this.name = paramsName || 'parent';

  //     this.say = () => {
  //       console.log('my name is parent');
  //     };
  //   }

  //   Parent.prototype.protoName = 'protoName';

  //   function Son() {
  //     Parent.call(this, 'paramsName');
  //     // this.name = 'Son';

  //     // this.say = () => {
  //     //   console.log('my name is son');
  //     // };
  //   }

  //   const _son = new Son();

  //   console.log(_son);
  // };

  // callExtends();

  // 组合继承
  /*
    总结：
    优点
      1. 可以给父类传参
      2. 构造出来的都是独立的实例，不会用重复引用的问题
      3. 可以继承原型上的属性和方法
    缺点
      1. 会调用两次父类的构造函数
      2. Son的构造函数是Parent
   */
  // const combExtends = () => {
  //   function Parent(paramsName) {
  //     this.name = paramsName || 'parent';

  //     this.arr = [1, 2, 3, 4];

  //     this.say = () => {
  //       console.log('my name is parent');
  //     };
  //   }

  //   Parent.prototype.protoName = 'protoName';

  //   function Son() {
  //     Parent.call(this, 'paramsName');
  //     // this.name = 'Son';

  //     // this.say = () => {
  //     //   console.log('my name is son');
  //     // };
  //   }

  //   Son.prototype = new Parent();

  //   const _son1 = new Son();
  //   const _son2 = new Son();

  //   _son1.arr.push(5);

  //   console.log(_son1, _son2);
  // };

  // combExtends();

  // 寄生组合继承
  /*
    总结：
      解决以上方法中的缺点
   */
  const finalExtends = () => {
    function Parent(paramsName) {
      this.name = paramsName || 'parent';

      this.arr = [1, 2, 3, 4];

      this.say = () => {
        console.log('my name is parent');
      };
    }

    Parent.prototype.protoName = 'protoName';

    function Son() {
      Parent.call(this, 'paramsName');
      // this.name = 'Son';

      // this.say = () => {
      //   console.log('my name is son');
      // };
    }

    Son.prototype = Object.create(Parent.prototype);
    Son.prototype.constructor = Son;

    const _son1 = new Son();
    const _son2 = new Son();

    _son1.arr.push(5);

    console.log(_son1, _son2);
  };

  finalExtends();

  return <div>extends2</div>;
}
