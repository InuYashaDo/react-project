import React from 'react';
import styles from './index.less';

export default function index() {
  return (
    <div className={styles.root}>
      <div className='two-line-container'>
        <div className='left'>左边</div>
        <div className='right'>右边</div>
      </div>
    </div>
  );
}
