import React, { useEffect, useRef } from 'react';
import { Checkbox, Button } from 'antd';
import ClassChild from './classChild';
import FuncChild from './funcChild';

export default function FuncParent() {
  const ref = React.createRef();
  // const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, []);


  return (
    <div>
      这是function父组件
      <input type='text' name='' id='' ref={ref} />
    </div>
  );
}
