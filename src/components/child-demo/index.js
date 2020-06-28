import React, { PureComponent } from "react";

class Child extends PureComponent {

  // 使用方法
  static whyDidYouRender = true
  
  render() {
    const { num, styleProps } = this.props;
    console.log('这时子组件的render');
    
    return <div style={styleProps}>子组件{num}</div>;
  }
}

export default Child;
