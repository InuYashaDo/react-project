import React from 'react';
import styles from './index.less';

export default function Bfc() {
  const renderMargin = () => {
    return (
      <div className='type-margin'>
        <p>type1: margin重合</p>
        <div className='box1'>box1</div>
        <div className='wrap'>
          <div className='box2'>box2</div>
        </div>
      </div>
    );
  };

  const renderFloat = () => {
    return (
      <div className='type-float'>
        <p>type2: 清除浮动</p>
        <div className='float-wrap'>
          <div className='float1'>哈哈</div>
          <div className='float2'>呵呵</div>
        </div>
      </div>
    );
  };

  const renderAutoLayout = () => {
    return (
      <div className='auto-layout'>
        <p>type3：自适应布局</p>
        <div className='auto1'>嘻嘻</div>
        <div className='auto2'>啦啦</div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      {/* {renderMargin()} */}
      {/* {renderFloat()} */}
      {renderAutoLayout()}
    </div>
  );
}
