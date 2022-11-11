import React, { useState } from 'react';
import QK from './QK';
import styles from './layout.less';

export default function Layout() {
  return (
    <div className={styles.root}>
      <div className="qk-container">
        <QK />
      </div>
    </div>
  );
}
