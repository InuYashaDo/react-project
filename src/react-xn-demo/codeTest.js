import React, { Component } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export default class CodeTest extends Component {
  state = {
    a: 1,
  };

  componentDidMount() {
    // setInterval(() => {
    //   unstable_batchedUpdates(() => {
    //     this.setState({ a: this.state.a + 1 });
    //     this.setState({ a: this.state.a + 1 });
    //     this.setState({ a: this.state.a + 1 });
    //   });
    //   console.log(this.state.a, '====setInterval');
    // }, 1000);
    document.getElementById('testCode').addEventListener('click', () => {
      unstable_batchedUpdates(() => {
        this.setState({ a: this.state.a + 1 });
        this.setState({ a: this.state.a + 1 });
        this.setState({ a: this.state.a + 1 });
      })
      console.log(this.state.a,'====domClick');
    });
  }

  handleClick = () => {
    // this.setState(({ a }) => ({
    //   a: a + 1,
    // }));
    // console.log(this.state.a, '====handleClick');
  };

  render() {
    console.log(this.state.a, '====render');
    return (
      <div onClick={this.handleClick} id='testCode'>
        codeTest
      </div>
    );
  }
}
