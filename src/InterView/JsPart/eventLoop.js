import React, { Component } from 'react';

export default class EventLoop extends Component {
  componentDidMount() {
    document.getElementById('eventLoopTest').style.background = 'red';
    // Promise.resolve().then(() => {
    //   document.getElementById('eventLoopTest').style.background = 'yellow';
    // })
    setTimeout(() => {
      document.getElementById('eventLoopTest').style.background = 'yellow';
    });
  }

  render() {
    return <div id='eventLoopTest'>EventLoop</div>;
  }
}
