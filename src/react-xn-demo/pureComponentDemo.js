import React, { PureComponent } from "react";
import Child from '../components/child-demo/index'

class Demo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      father: 1,
      childProps: 2,
      a:{
        b:55555
      }
    };
  }

  // handleFather = () => {
  //   console.log("这是父组件点击事件");
  //   this.setState((pre) => {
  //     return {
  //       father: pre.father + 1,
  //     };
  //   });
  // };

  handleFather = () => {
    console.log("这是父组件点击事件");
    const { a } = this.state
    a.b=666666
    this.setState({a});
    const nowPromise = new Promise((resolve,reject) => {
      // resolve('hhhh')
      reject('hhh')
    })
    return nowPromise
  };

  handleUpdateChild = () => {
    console.log("这时子组件点击事件")
    this.setState((pre) => {
      return {
        childProps: pre.childProps + 1,
      };
    });
  };



  render() {
    const { father, childProps, a } = this.state;
    console.log('这时父组件的render');
    const styleProps = {color:'red'}
    
    return (
      <div>
        <button onClick={() => this.handleFather().then(data => {console.log(data);
        }).catch(error => {console.log(error);
        })}>更新父组件{a.b}</button>
        <button onClick={this.handleUpdateChild}>更新子组件{childProps}</button>
        <Child num={childProps} />
      </div>
    );
  }
}

export default Demo;
