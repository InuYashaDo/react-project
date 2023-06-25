import React from 'react';
import styles from './index.less';

export default function index() {
  const renderGpuTest = () => {
    return (
      <div className='gpu-test-container'>
        <div className='common-part'>A</div>
        <div className='gpu-part'>B</div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      {/* <div className='auto-wh-parent'>
        <div className='auto-wh-parent__child' />
      </div> */}
      {renderGpuTest()}
    </div>
  );
}
