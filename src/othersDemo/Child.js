import React, { useState } from 'react';
import { Button } from 'antd';

export default function Child() {
  const [count, setCount] = useState(1);

  console.log('child==========');

  return (
    <div>
      child
      <Button onClick={() => setCount((v) => v + 1)}>{count}++</Button>
    </div>
  );
}
