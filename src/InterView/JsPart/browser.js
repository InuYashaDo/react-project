import React from 'react';

export default function Browser() {
  // closure
  function test() {
    const outer = 1;
    // debugger
    var inner = () => {
      console.log(outer, '=========outer');
    }

    inner();
  }

  test();

  // function foo() {
  //   var myName = '极客时间';
  //   let test1 = 1;
  //   const test2 = 2;
  //   debugger
  //   var innerBar = {
  //     getName: function () {
  //       console.log(test1);
  //       return myName;
  //     },
  //     setName: function (newName) {
  //       myName = newName;
  //     },
  //   };
  //   return innerBar;
  // }
  // var bar = foo();
  // bar.setName('极客邦');
  // bar.getName();
  // console.log(bar.getName());

  return <div>browser</div>;
}
