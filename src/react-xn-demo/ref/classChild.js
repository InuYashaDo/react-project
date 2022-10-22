import React, { Component } from 'react';

class ClassChild extends Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  componentDidMount() {
    this.childRef.current.focus();
  }

  childFunc = () => {
    console.log('====================================');
    console.log('click');
    console.log('====================================');
  };

  render() {
    return (
      <div>
        这是class子组件
        <input type='text' ref={this.childRef} />
      </div>
    );
  }
}

export default ClassChild;
