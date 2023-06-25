import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';

const loadingPoint = ['red', 'yellow', 'blue'];
const aniList = ['animation', 'transform', 'js-time'];

export default function Animation() {
  const [animationType, setAnimationType] = useState('transform');
  // animationType 动画类型
  // animation ==> css animation动画
  // transform ==> css transform动画

  // 切换动画按钮
  const renderButton = (type) => {
    return (
      <Button
        type={type === animationType ? 'primary' : 'default'}
        onClick={() => setAnimationType(type)}
      >
        {type}
      </Button>
    );
  };

  return (
    <div className={styles.root}>
      <div className='button-list'>{aniList.map(renderButton)}</div>
      <div className={`loading-container ${animationType}`}>
        {loadingPoint.map((item) => (
          <div className='loading-point' style={{ background: item }}></div>
        ))}
      </div>
    </div>
  );
}
