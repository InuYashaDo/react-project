# js部分
## 你怎么理解this？
this是函数执行时产生的，只在函数内部有用，总指向调用这个函数的对象。

## 原型和原型链
每一个构造函数上都有一个prototype属性，这个属性就代表该构造函数的原型对象。

每一个原型对象上都有__proto__属性，指向当前的原型，这种通过原型形成的链条称为原型链。

## 作用域和作用域链？词法作用域？
作用域是指变量和函数的可访问范围。

每个执行上下文都包含一个outer指向他的外部函数，通过outer一层一层向外查找变量的操作为作用域链

词法作用域就是指函数作用域是函数声明位置决定的，所以词法作用域是静态的作用域，通过他能预测代码在执行过程中如何查找标识符。

## 你怎么理解闭包？平常的使用场景？
根据词法作用域的规则，内部函数总是可以访问他们外部函数的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束
但是该内部函数引用外部函数的变量依然存在于内存中，这个内部函数和他引用的变量就称为闭包。


## 谈一下promise？你能说一下实现一个PromiseA+规范的流程吗？
promise简单来说是一个容器，它内部存储着保存着在未来某个阶段才会结束的事件的结果，从语法上说Promise是一个对象,从它可以获取异步操作的消息。是用来解决回调地狱。
Promise上的静态方法有
  all 
    成功：当所有方法成功时，按传入顺序返回所有成功的结果。并行处理。
    失败：当有一个方法失败时，进入失败方法。依然会执行完所有的方法，因为是遍历传入的所有Promise。之所以会只返回第一个失败的原因是因为Promise.all返回的也是一个Promise，一旦状态被resolve或reject就不可更改了。
  finally
    resolve和reject传入同样的回调方法，当成功或失败时都会执行
  allSettled
    当所有Promise执行完成后返回结果数组，数组的每一项都为一个对象，对象表示该Promise的结果
  any
    与all相反

## 介绍一下generator
是一种异步编程方案。形式上是一个普通函数，但是有两个特征：一是function关键字和函数名之间有一个*号，二是函数体内部使用yield表达式，定义内部不同的状态。
调用generator函数后返回的是一个内部状态的指针对象。内部遇到yield方法停止执行同步next不断改变内部指针的指向。

## 介绍一下async和await
async和await是Promise和generator函数的语法糖
一个函数如果加上async就会返回一个Promise，可以看成加async的函数被Promise.resolve包裹了一下
优点：使用同步代码来作异步编程
缺点：会阻塞代码

## 实现继承
原型链继承
  function Parent(){}
  function Child()}{}
  child.prototype = new Parent()
  缺点：多个实例共享同一个原型对象，内存空间是相同的，修改其中一个会影响其他。
构造函数继承
  function Parent(){};
  function Child(){
    parent.call(this)
  };
  const child = new Child()
  优点：优化了第一种继承方式，每次都会产生不对的实例对象。
  缺点：只能继承实例的属性和方法，不能继承原型的属性和方法。
组合继承
  function Parent(){}
  function Child(){
    Parent.call(this)
  }
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
  解决了方式一和方式二的继承问题。
  但是缺点是调用了两遍父组件的构造方法
原型式继承
  let parent = {}
  let child = Object.create(parent);
  缺点：利用Object.create的浅拷贝，多个实例的引用属性指向相同的内存，存在篡改的可能。
寄生式继承
  let parent = {};
  function clone(original) {
    let cloneObj = Object.create(original);
    cloneObj.func = function() {
      console.log('hh')
    }
    return cloneObj
  }
  在原型式继承的基础上增加了添加方法的能力，缺点同上
寄生组合式继承
  function clone(parent,child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }
  function Parent(){}
  function Child(){
    Parent.call(this)
  }
  clone(Parent,Child);
  const child = new Child()
  优点：解决以上所有问题
extends
  class Parent {};
  class Child extends Parent{}
  const child = new Child()
  es6的继承方法，经过babel编译之后也是寄生组合继承的写法

## 实现bind、call、apply
call:
  Function.prototype.call(context,...arg){
    const fn = Symbol('fn');
    context.fn = this;
    const res = context.fn(...arg);
    delete context.fn;
    return res
  }
apply:
  Function.prototype.apply(context,arg) {
    const fn = Symbol('fn');
    context.fn = this;
    const res = context.fn(...arg);
    delete context.fn;
    return res
  }
bind:
  Function.prototype.bind(context,...arg) {
    const fn = Symbol('fn');
    context.fn = this;
    return function Func(arguments) {
      const res = context instance of Func ? this(arg.contact(...arguments)):context.fn(...arg);
      delete context.fn
      return res
    }
  }

## new是什么意思？怎么实现一个new？

## 介绍一下map和set？

## String、Array、Object都有哪些常用的方法？

## 数组哪些方法会改变原数组？

## 实现一个reduce

## typeof和instanceof有什么区别？ 实现一个能准确检测类型的方法

## js的事件循环？和node的事件循环有什么区别？
每个渲染进程都有一个主线程，js线程是运行在渲染进程的主线程上的，所以js线程是单线程的。
由于js单线程的特点，异步事件会阻塞主线程的进行且需要接收其他线程和进程的任务，所以引入了事件循环和消息队列。
在主线程的代码执行中，如果碰到异步任务会将其放到任务队列中，等到主线程同步代码执行完成后再去执行任务队列中的异步代码。
但是只有异步任务队列解决不了异步任务优先级的问题，假如有异步任务操作dom，就不能将该任务前置，及时的获取最新的dom。所以又引入了微任务和宏任务的概念。
像Promise，mutationObserver等都是微任务。
像script、setTimeout、setInterval、i/o、UI render、用户交互事件(如鼠标点击、页面滚动、放大缩小)等都是宏任务。
浏览器会现在主线程中执行同步代码、碰到微任务将该任务放入到该宏任务对应的微任务队列中。碰到异步宏任务就放到宏任务队列中。
等到主线程同步代码执行完成后，就去执行微任务队列，将微任务队列执行完成后，如果对应的有dom更新就执行gui渲染。然后执行下一个宏任务，如此循环往复称为事件循环。

## js是怎么处理setTimeout的
当执行到setTimeout时，浏览器会将其放入到延时队列中。在执行主线程对应的事件循环时，每执行完一个任务后都会执行延时消息队列中的任务，将已经到期的延时任务对应的回调放入到宏任务消息队列末尾。

## js中的执行上下文是什么？

## 实现深浅拷贝

## 实现防抖和节流