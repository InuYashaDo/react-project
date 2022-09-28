import React from 'react';

export default function Extend() {
  // case1 原型链继承
  // function Parent() {
  //   this.name = 'parent1';
  //   this.color = 'red';
  //   this.test = [1, 2, 3];
  // }

  // function Child() {
  //   this.type = 'type';
  // }

  // Child.prototype = new Parent();

  // const s1 = new Child();
  // const s2 = new Child();

  // s1.test.push(4);

  // console.log(s1, s2);

  // case2 构造函数继承
  // function Parent() {
  //   this.name = '构造函数';
  //   this.arr = [1, 2, 3];
  // }

  // Parent.prototype.getName = function () {
  //   return this.name;
  // };

  // Parent.prototype.newVal = 'hh';

  // function Child() {
  //   Parent.call(this);
  //   this.color = 'red';
  // }

  // const s1 = new Child();
  // const s2 = new Child();
  // const p1 = new Parent();

  // s1.arr.push(1);

  // console.log(s1, s2, p1);

  // case3 组合继承
  // function Parent() {
  //   this.name = '组合继承';
  //   this.arr = [1, 2, 3];
  // }

  // Parent.prototype.getName = function () {
  //   return this.name;
  // };

  // function Child() {
  //   Parent.call(this);
  //   this.childName = '哈哈';
  //   this.childArr = [5, 4];
  // }

  // Child.prototype = new Parent();

  // Child.prototype.constructor = Child;

  // const s1 = new Child();
  // const s2 = new Child();
  // const p1 = new Parent();

  // s1.childArr.push(1);
  // s1.arr.push(4);
  // p1.arr.push(555);

  // console.log(s1, s2, p1, s1.getName());

  // case4 原型式继承
  // const parent = {
  //   name: '原型式继承',
  //   getName: function () {
  //     return this.name;
  //   },
  //   arr: [1, 2, 3],
  // };

  // const s1 = Object.create(parent);
  // const s2 = Object.create(parent);
  // const s3 = Object.create(parent);

  // s1.name = 's1';
  // s2.name = 's2';
  // s3.name = 's3';

  // s1.arr.push('s1');
  // s2.arr.push('s2');
  // s3.arr.push('s3');

  // const s1Name = s1.getName();
  // const s2Name = s2.getName();
  // const s3Name = s3.getName();

  // console.log(s1, s2, s3, s1Name, s2Name, s3Name, parent);

  // 寄生式继承
  // const parent = {
  //   name: '寄生式继承',
  //   arr: [1, 2, 3],
  //   getName: function () {
  //     return this.name;
  //   },
  // };

  // function clone(par) {
  //   const cloneObj = Object.create(par);
  //   cloneObj.newVal = {
  //     a: 'hh',
  //     b: 'xx',
  //   };

  //   cloneObj.childFun = function () {
  //     return this.newVal;
  //   };
  //   return cloneObj;
  // }

  // const s1 = clone(parent);
  // const s2 = clone(parent);

  // s1.newVal = 'aa';
  // s2.newVal = 'bb';

  // console.log(s1, s2);

  // 寄生组合式继承
  function clone(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }

  function Parent() {
    this.name = '父';
    this.getName = function () {
      return this.name;
    };
    this.arr = [1, 2, 3];
  }

  Parent.prototype.getArr = function () {
    return this.arr;
  };

  function Child() {
    Parent.call(this);
    this.childName = 'hh';
    this.childArr = [5, 5, 5];
  }

  clone(Parent, Child);

  Child.prototype.getChildArr = function () {
    return this.childArr;
  };

  const s1 = new Child();
  const s2 = new Child();

  s1.arr.push('s1');
  s2.arr.push('s2');

  s1.childArr.push('s1child')
  s2.childArr.push('s2child')

  const s1Arr = s1.getArr();
  const s2Arr = s2.getArr();

  const s1ChildArr = s1.getChildArr();
  const s2ChildArr = s2.getChildArr();

  console.log(s1,s2);
  console.log(s1Arr,s2Arr);
  console.log(s1ChildArr,s2ChildArr);


  return <div>extend</div>;
}
