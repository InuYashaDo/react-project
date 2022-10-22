import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import Children from './child/memo';

export default function UseCallBack() {
  const [index, setIndex] = useState(0);

  const childFunc = () => {
    console.log('子组件调用父组件方法');
    setIndex(index + 1);
  };

  // const childFunc = useCallback(() => {
  //   console.log('子组件调用父组件方法');
  //   setIndex(index + 1);
  // }, []);

  console.log('父组件更新');
  return (
    <div>
      这是父组件{index}
      <Button onClick={() => setIndex(index + 1)}>更新父组件index</Button>
      <Children a={1} onClick={childFunc} />
    </div>
  );
}
