import React, { forwardRef } from 'react';
import Son from './son';

function Father(props, ref) {

  return (
    <div>
      父组件
      <Son grandRef={ref} />
    </div>
  );
}

export default forwardRef((props, ref) => Father(props, ref));
