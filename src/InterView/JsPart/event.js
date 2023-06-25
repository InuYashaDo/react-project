import React from 'react';

export default function EventComp() {
  const childClick = () => {
    console.log('child=====被点击了');
  };

  const parentClick = () => {
    console.log('parent====被点击了');
  };

  return (
    <div>
      <div
        style={{ height: 100, width: 100, background: 'red' }}
        onClick={parentClick}
      >
        这是外层父容器
        <div
          style={{ height: 50, width: 50, background: 'green' }}
          onClick={childClick}
        >
          这是子容器
        </div>
      </div>
    </div>
  );
}
