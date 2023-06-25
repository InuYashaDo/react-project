import React, { useState } from 'react';

export default function Parent({ Comp }) {
  const [num, setNum] = useState(0);

  console.log('parent=======');

  return (
    <div>
      parent{num}
      { Comp }
      <div onClick={() => setNum(num + 1)}>更新</div>
    </div>
  );
}
