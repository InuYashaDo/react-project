import React, { useState, useRef, useEffect } from 'react';
import GrandFather from './grandFather';

export default function Ref() {
  const [id, setId] = useState(1);

  return (
    <div>
      Ref
      <button onClick={() => setId((pre) => pre + 1)}>更新id</button>
      <GrandFather id={id} />
    </div>
  );
}
