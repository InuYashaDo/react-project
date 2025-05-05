import React from 'react';
import styles from './index.less';

export default function index() {
  return (
    <div className={styles.root}>
      <div className='flex-container'>
        <div className='flex-width'>这是固定宽度</div>
        <div className='flex-auto'>
          自适应宽度
          <div className='over-width'>hh</div>
        </div>
      </div>
    </div>
  );
}
