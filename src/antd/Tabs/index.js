import React, { Component } from 'react'
import FirstDemo from "./FirstDemo";
import SecondDemo from "./SecondDemo";

export class TabsIndex extends Component {
  static FirstDemo = FirstDemo
  static SecondDemo = SecondDemo

  render() {
    return (
      <div id='root'>
        
      </div>
    )
  }
}

export default TabsIndex

