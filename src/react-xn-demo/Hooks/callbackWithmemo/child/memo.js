import { Button } from 'antd';
import React from 'react';

function Memo({ onClick }) {
  console.log('子组件更新');

  return (
    <div>
      这是子组件
      <Button onClick={onClick}>子组件调用父组件方法</Button>
    </div>
  );
}

export default React.memo(Memo);
// export default Memo;
