import React, { useRef, useEffect } from 'react';
import Father from './father';

const tabData = [
  { id: 0, name: 0 },
  { id: 1, name: 1 },
  { id: 2, name: 2 },
];

export default function GrandFather({ id }) {
  // const ref = useRef(null);

  const tabRef = useRef(tabData[0]);

  const changeTab = (item) => {
    tabRef.current = item;
  };

  useEffect(() => {
      console.log('====================================');
      console.log(tabRef);
      console.log('====================================');
  }, [id]);

  return (
    <div>
      爷组件
      {/* <Father ref={ref} />
      <button
        onClick={() => {
          console.log('====================================');
          console.log(ref);
          console.log('====================================');
        }}
      >
        获取孙组件
      </button> */}
      {tabData.map((item) => {
        return <button onClick={() => changeTab(item)}>{item.name}</button>;
      })}
    </div>
  );
}
