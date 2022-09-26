import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';

const Child1 = React.memo(function () {
  console.log('====================================');
  console.log('child1 updates');
  console.log('====================================');
  return <div>child1</div>;
});

const Child2 = React.memo(function (props) {
  console.log('====================================');
  console.log('child2 updates', props.arr2);
  console.log('====================================');
  return <div>child2</div>;
});

const Child3 = React.memo(function (props) {
  console.log('====================================');
  console.log('child3 updates', props.arr3);
  console.log('====================================');
  return <div>child3</div>;
});


export default function UseMemo() {
  const [arr1, setArr1] = useState([{ a: 1 }]);
  const [arr2, setArr2] = useState([{ b: 2 }]);
  const [arr3, setArr3] = useState([{ c: 3 }]);
  const [num, setNum] = useState(1);

  return (
    <div>
      <Child1 arr1={num} />
      <Child2 arr2={arr2} />
      <Child3 arr3={arr3} />
      <Button onClick={() => setArr2([])}>更新第二个arr</Button>
    </div>
  );
}
