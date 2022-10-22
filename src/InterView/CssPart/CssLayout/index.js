import React from 'react';
import styles from './index.less';

export default function index() {
  return (
    <div className={styles.root}>
      {/* 两列布局 */}
      <div className='two-line-container'>
        <div className='left'>左边</div>
        <div className='right'>右边</div>
      </div>
      <div className='three-line-container'>
        <div className='left'>左边</div>
        <div className='right'>右边</div>
        <div className='middle'>中间</div>
      </div>
    </div>
  );
}
