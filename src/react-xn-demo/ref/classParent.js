import React, { Component } from 'react';
import FuncChild from './funcChild';
import ClassChild from './classChild';

class ClassParent extends Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
  }

  componentDidMount() {
    this.parentRef.current.childRef.current.focus();
    this.parentRef.current.childFunc();
  }

  render() {
    return (
      <div>
        这是class父组件
        <ClassChild ref={this.parentRef} />
      </div>
    );
  }
}

export default ClassParent;
