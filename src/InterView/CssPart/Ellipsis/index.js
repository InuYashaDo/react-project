import React from 'react';
import styles from './index.less';

export default function index() {
  return (
    <div className={styles.root}>
      <div className='one-line'>
        这是一行隐藏哈哈哈哈哈哈哈哈好哈哈哈哈哈哈哈
      </div>

      <div className='mul-line'>
        这是三行隐藏哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
    </div>
  );
}
