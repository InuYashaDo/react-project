import React from 'react';
import styles from './index.less';

export default function index() {
  return (
    <div className={styles.root}>
      <div className='triangle' />
      <div className='circle' />
      <div className='semicircle' />
      <div className='ellipse' />
      <div className='sector' />
      <div className='trapezoid' />
    </div>
  );
}
