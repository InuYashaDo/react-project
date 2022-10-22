## 什么是jsx？jsx怎么转换成React element？React Element怎么转换成react fiber？
jsx是js的语法扩展，jsx可以很好的描述ui它应有交互的本质形式。类似模板语言。
jsx经由babel转译后会转换成React Element形式(由react.createElement函数得来)。
  React Element参数
    第一个参数：如果是组件类型，会传入相对应的组件和函数，如果是dom元素类型，会传入相对应的字符串如div，span等。
    第二个参数：一个对象，在dom类型中为标签属性，在组件类型中为props
    其他参数：依次为children，按顺序排列。
  jsx转换后对应的react element为
    jsx                 react element                   type
    element类型          react element类型                标签字符串，例如div
    fragment类型         react element类型                symbol react.fragment类型
    文本类型              直接字符串                        无
    数组类型              返回数组结构 里面元素也被转换        无
    组件类型              react element类型                组件类或者组件函数本身
    三元运算/表达式        先执行 然后按照上述规则转换          看三元返回结果
    函数执行              先执行函数 然后按照上述规则转换       看函数结果返回
react element 经过底层调和后会转换为react fiber
  react针对不同react element会产生不同tag(种类)的fiber对象，然后通过sibling、child、return将每一个fiber对象连接起来
  不同react element对应的tag如下
    FunctionComponent      tag = 0     函数式组件
    ClassComponent         tag = 1     类组件
    IndeterminateComponent tag = 2     初始化时不知道是函数式组件还是类组件
    HostRoot               tag = 3     root fiber可以理解为通过reactDom.render()产生的根元素
    HostPortal             tag = 4     对应react.createPatrol产生的portal
    HostComponent          tag = 5     dom元素 例如div
    HostText               tag = 6     文本节点
    Fragment               tag = 7     对应<React.Fragment>
    Mode                   tag = 8     对应<React.StrictMode>
    ContextConsumer        tag = 9     对应<React.Consumer>
    ContextProvider        tag = 10    对应<React.Provider>
    ForwardRef             tag = 11    对应<React.ForwardRef>
    Profiler               tag = 12    对应<Profiler>
    SuspenseComponent      tag = 13    对应<Suspense>
    MemoComponent          tag = 14    对应React.memo返回的组件
注意：
  老版本的react在使用jsx语法的文件中，之所以需要import React from react是因为jsx语法经过编译后会变成React.createElement形式，所以需要引入，防止找不到react
  react.createElement和react.cloneElement的区别为 一个用以创建element，一个用于修改element并返回一个新的element
  对于在jsx中写的map数组结构的子节点，外层会被加上fragment，map返回数组结构作为fragment的子节点。
## 怎么理解react组件？
  组件本质上就是类和函数，但是与常规的类和函数不同的是，组件承载了渲染视图的ui和更新视图的setState、useState等方法。react在底层逻辑上会像正常实例化类和正常执行函数那样处理组件。
  react对于组件的底层处理逻辑
    类组件
      function constructClassInstance(
        workInProgress, // 当前正在工作的fiber对象
        ctor, // 我们的类组件
        props
      ){
        // 实例化组件，得到组件实例instance
        const instance = new Ctor(props,context)
      }
    函数式组件
      function renderWithHooks(
        current,  // 当前组件对应的fiber，初始化
        workInProgress, // 当前正在工作的fiber对象
        component,  // 我们的函数组件
        props, // 函数组件对应的第一个参数
        secondArg,  // 函数组件对应的其他参数
        nextRenderExpirationTime  // 函数组件下次渲染过期时间
      ){
        // 执行函数组件，得到return返回的React.element对象
        let children = Component(props,secondArg)
      }
## 类组件和函数组件的区别？
定义:
  类组件除了继承React.component，底层还加入了updater对象，组件中调用的setState和forceUpdate本质上是调用了updater对象上的enqueueSetState和enqueueForceUpdate方法
  函数组件是采用直接执行函数的方式，而不是通过new
区别:
  对于类组件，底层只需实例化一次，实例中保存了组件的state等状态，对于每一次更新只需要调用render方法及相应的生命周期就可以了。
  但是在函数组件中，每一次更新都是新的函数的执行，一次函数组件的更新，里面的变量会重新声明。
## 组件间通信方式有哪些？
  通过props和callback
  通过redux或者mobx等状态管理
  通过context
  通过ref
  通过事件总线 // 缺点：需要手动绑定和解绑，不好维护，本质上修改了react数据流向
## 怎么增强react组件？
  类组件继承
    优点：
      可以控制父组件的render
      可以共享父组件的属性和方法，还可以添加自己的属性和方法
    缺点
      state和声明周期会被继承后的组件修改
  函数组件自定义hooks
  hoc
## 一次事件触发一次setState，react底层的处理
首先setState会产生当前更新的优先级(老版本用expirationTime，新版本用lane)。
接下来React会从Fiber root根部fiber向下调和子节点，调和阶段将对比发生更新的地方，更新对比expirationTime，找到发生更新的组件合并state，触发render函数，得到新的UI视图层，完成render
接下来到commit阶段，commit阶段替换真实的dom，完成此次更新流程
此时仍然在commit阶段，会执行setState中callback函数，到此完成了一次setState全过程
## setState原理揭秘
对于类组件，类组件初始化的时候绑定了负责更新的updater对象，对于调用setState方法，实际上是react底层调用了updater上的enqueueSetState方法
enqueueSetState(){
  // 每一次调用setState都会创建一个update
  const update = createUpdate(expirationTime,suspenseConfig)
  // callback为setState的第二个参数
  callback && (update.callback = callback)
  // enqueueUpdate把当前的update传入当前fiber,待更新队列中
  enqueueUpdate(fiber,update)
  // 开始调度更新
  scheduleUpdateOnFiber(fiber,expirationTime)
}
## setState的批量更新
正常的state触发，UI交互都是由用户事件触发，react是采用事件合成的每一个事件都是由react统一调度的，所以state的更新正是和事件息息相关的。
// 在legacy模式下，所有的事件都将经过此函数统一处理
function dispatchEventForLegacyPluginEventSystem() {
  // handleTopLevel 事件处理函数
  batchedEventUpdates(handleTopLevel,bookKeeping)
}
function batchedEventUpdates(fn, a) {
  // 开启批量更新
  isBatchingEventUpdates = true;
  try {
    // 这里执行的事件处理函数，比如在一次点击事件中触发setState，那么它将在这个函数内执行
    return batchedEventUpdatesImpl(fn,a,b)
  } finally {
    // try里面return不会影响finally执行
    // 完成一次事件，批量更新
    isBatchingEventUpdates = false;
  }
}
## 为什么异步操作里面会把批量更新会打破呢？
是因为在异步操作里，setState是写在异步方法的回调里，比如如下代码
setTimeout(() => {
  this.setState({a:1})
},1000)
在执行函数时，触发isBatchingEventUpdates = true,然后执行事件对应的回调方法，执行setTimeout，事件执行完毕，isBatchingEventUpdates = false
而后等到事件循环机制触发执行setState。事件合成依然执行了，但是setState的操作并没有同步执行。
## 为什么通过addEventListener添加的方法是同步的
是因为通过dom元素手动绑定的方法不会经由react的事件合成机制，不会触发批量更新处理方法
## 如何在异步环境或者手动绑定的事件下，继续开启批量更新呢
react-dom中提供了批量更新方法unstable_batchedUpdates，可以手动批量更新
## 如何提供更新优先级？
react-dom中提供一个flushSync，可以将回调函数中的更新任务，放在一个较高的优先级中。
## 为什么useState的dispatch方法始终获取不到最新的state的值
因为函数组件更新就是函数的执行，在函数一次执行过程中，函数内部所有变量重新声明，所以改变的state，只有在下一次函数组件执行时才会被更新。
## 类组件中的setState和函数组件的useState有什么异同？
相同点：
  setState和useState更新视图，底层都调用了scheduleUpdateOnFiber方法，而且事件驱动情况下都有批量更新规则。
不同点：
  1.不采用任何优化手段下，setState只要调用就会更新，不会比价两次的值。但是useState中的dispatchAction会默认比较两次state是否相同然后决定是否更新组件
  2.setState有专门监听state变化的回调函数，可以获取最新state。函数组件中没有，只能通过useEffect来执行state变化引起的副作用
  3。setState在底层处理逻辑上主要是和老state进行合并处理，而useState更倾向于重新赋值。
## props的可以是什么
props作为一个子组件渲染数据源
props作为一个通知父组件的回调函数
props作为一个单纯的组件传递
props作为渲染函数
render props和上面的区别是放到了children里
render component作为组件插槽
## react的render阶段和commit阶段
react在调和(render)阶段会深度遍历react Fiber树，目的就是发现不同(diff)，不同的地方就是接下来需要更新的地方，对于变化的组件就会执行render函数。在一次调和过程完毕之后，就到了commit阶段，commit阶段会创建修改真实的dom节点。
如果在一次调和过程中，发现了一个类组件的情况，就会按照类组件的逻辑来处理
// workloop react处理类组件的主要功能方法
function updateClassComponent() {
  let shouldUpdate
  const instance = workInProgress.stateNode // stateNode是fiber指向类组件实例的指针
  if(instance === null) { // instance为组件实例，如果实例不存在，证明该类组件没有被挂载过，那么会走初始化流程
    constructClassInstance(workInProgress, Component, nextProps); // 组件实例将在这个方法中被new
    mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime); // 初始化挂载组件流程
    shouldUpdate = true; // shouldUpdate 标识用来证明 组件是否需要更新
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps, renderExpirationTimer) // 更新组件流程
  }
  if(shouldUpdate) {
    nextChildren = instance.render(); // 执行render函数，得到子节点
    reconcileChildren(current,workInProgress,nextChildren,renderExpirationTime) // 继续调和子节点
  }
}
几个重要概念：
1.instance 类组件对应实例
2.workInProgress树，当前正在调和的fiber树，一次更新中，react会自上而下深度遍历子代fiber，如果遍历到一个fiber，会把当前fiber指向workInProgress
3.current树，在初始化更新中，current=null，在第一次fiber调和之后，会将workInProgress树赋值给current树。react来用workInProgress和current来确保一次更新中，快速构建，且状态不丢失
4.Component就是项目中的class组件
5.nextProps作为组件在一次更新中新的props
6.renderExpirationTime作为下一次渲染的过期时间。
## 组件实例和fiber的关系
在组件实例上可以通过_reactInternals属性来访问组件对应的fiber对象。在fiber对象上，可以通过stateNode来访问当前fiber对应的组件实例。
## 生命周期执行
初始化阶段：constructor => getDerivedStateFromProps/componentWillMount => render => componentDidMount
更新阶段：componentWillReceiveProps(props改变)/getDerivedStateFromProps => shouldComponentUpdate => componentWillUpdate => render => getSnapshotBeforeUpdate => componentDidUpdate
销毁阶段：componentWillUnmount
