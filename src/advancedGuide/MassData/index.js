import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const fillList = [...new Array(30000).keys()];

const eachRenderNum = 500;

const times = Math.ceil(fillList.length / eachRenderNum);
let index = 1;

export default function MassData() {
  const [showBtn, setShowBtn] = useState(false);
  const [renderList, setRenderList] = useState([]);

  const renderNewList = () => {
    const dataList = fillList.slice(
      (index - 1) * eachRenderNum,
      index * eachRenderNum
    );
    return <> {dataList.map(randomPoint)}</>;
  };

  const handleRenderList = () => {
    if (index > times) return;
    // setRenderList((pre) => [
    //   ...pre,
    //   ...fillList.slice((index - 1) * eachRenderNum, index * eachRenderNum),
    // ]);
    setRenderList((pre) => [...pre, renderNewList()]);
    requestIdleCallback(() => {
      index++;
      handleRenderList();
    });
  };

  useEffect(() => {
    if (showBtn) {
      handleRenderList(index);
    }
  }, [showBtn]);

  const randomPoint = (inx) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const randomColor = `rgba(${r},${g},${b},0.8)`;
    return (
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: randomColor,
          position: 'absolute',
          top: `${Math.floor(Math.random() * 600)}px`,
          left: `${Math.floor(Math.random() * 600)}px`,
        }}
        key={inx}
      />
    );
  };

  const handleShow = () => {
    setShowBtn((pre) => !pre);
  };

  // const renderBox = () => {
  //   return renderList.map((inx) => randomPoint(inx));
  // };

  return (
    <div>
      {showBtn ? renderList : <Button onClick={handleShow}>展示</Button>}
      {/* {showBtn ? renderBox() : <Button onClick={handleShow}>展示</Button>} */}
    </div>
  );
}
