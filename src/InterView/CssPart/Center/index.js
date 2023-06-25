import React from 'react';
import styles from './index.less';

export default function Center() {
  const renderHW = () => {
    return <div className='wh'></div>;
  };

  return <div className={styles.root}>{renderHW()}</div>;
}
