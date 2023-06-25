import React from 'react';

export default function Copy2() {
  const originObj = {
    name: 'originObj',
    child: {
      name: 'originObjChild',
      child: {
        grandSon: {
          name: 'grandSon',
        },
      },
      // loop: originObj,
    },
    arr: [1, 2, 3],
    sym: Symbol(1),
    date: new Date(),
    fun: function getName() {
      console.log(this.name);
    },
    nu: null,
    un: undefined,
    bool: true,
    unEnum: {
      name: 'unEnumObj',
    },
    reg: new RegExp(),
  };

  Object.defineProperty(originObj, 'unEnum', {
    enumerable: false,
  });

  originObj.__proto__.proto = {
    name: 'originProto',
  };

  // originObj.loop = originObj;
  // 浅拷贝
  const shallowCopy = () => {
    const extendsObj = Object.create(originObj, {
      newName: {
        value: 'extends',
      },
    });

    // case1 展开运算符
    /*
      总结：
        1.不可拷贝继承过来的属性 
        2.不可拷贝不可枚举的属性
        Object.create会创建一个以第一个参数为原型的对象出来
    */
    // const expandObj = { ...originObj };
    // const expandExtendsObj = { ...extendsObj };
    // expandObj.child.name = 'expandChild';
    // console.log('expandObj========', expandObj);
    // console.log('originObj========', originObj);
    // console.log('expandExtendsObj========', expandExtendsObj);

    // case2 使用assign 总结：同上
    // const assignObj = Object.assign({}, originObj);
    // const assignExtendsObj = Object.assign({}, extendsObj);
    // assignObj.child.name = 'assignChild';
    // console.log('assignObj========', assignObj);
    // console.log('originObj========', originObj);
    // console.log('assignExtendsObj========', assignExtendsObj);

    // case3 使用for-in遍历
    /*
      总结：
        1. for-in 不能遍历不可枚举属性
        2. for-in 会遍历所有可枚举属性，包括原型，所以为了避免遍历原型上的属性和方法可以加hasOwnProperty判断
    */
    // const forInObj = {};
    // for (let property in originObj) {
    //   if (Object.hasOwnProperty.call(originObj, property)) {
    //     forInObj[property] = originObj[property];
    //   }
    // }
    // console.log('forInObj========', forInObj);

    // case4 使用Object.getOwnPropertyDescriptors和Object.create
    // const ownObj = Object.create(
    //   Object.getPrototypeOf(originObj),
    //   Object.getOwnPropertyDescriptors(originObj)
    // );
    // console.log('ownObj========', ownObj);
  };

  // 深拷贝
  const deepCopy = (obj, hash = new WeakMap()) => {
    // case1 使用json
    /*
      总结：
        1.不能序列化symbol、fun、date类型
        2.包含循环引用会报错
        3.可以拷贝原型
     */
    // const jsonObj = JSON.parse(JSON.stringify(originObj));
    // console.log(jsonObj);

    // case2 递归--基础版
    // let cloneObj = {};
    // for (let key in obj) {
    //   if (typeof obj[key] === 'object') {
    //     cloneObj[key] = deepCopy(obj[key]);
    //   } else {
    //     cloneObj[key] = obj[key];
    //   }
    // }
    // return cloneObj;

    // case2 递归--完整版
    // 要考虑 null symbol date类型  Reg类型 不可枚举  function 循环引用
    if (obj === null) return null;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    if (hash.has(obj)) {
      return hash.get(obj);
    }

    const allDesc = Object.getOwnPropertyDescriptors(obj);
    const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

    hash.set(obj, cloneObj);

    for (let key of Reflect.ownKeys(obj)) {
      if (
        typeof obj[key] === 'object' &&
        typeof obj[key] !== null &&
        typeof obj[key] !== 'function'
      ) {
        cloneObj[key] = deepCopy(obj[key], hash);
        return;
      }
      cloneObj[key] = obj[key];
    }

    return cloneObj;
  };

  // shallowCopy();

  deepCopy(originObj);

  return <div>copy2</div>;
}
