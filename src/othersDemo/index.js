import React, { Fragment, useState } from 'react';
import Child from './Child';
import Cache from './Cache';
import styles from './index.less';

export default function Index() {
  const [prop] = useState({});

  // 使用window.target打开新页面
  const handleOpenNewPage = () => {
    const opener = window.open('http://baidu.com');
    opener.opener = null;
  };

  // 查看不同获取节点的方式得到的结果
  const handleGetAllChild = () => {
    const parentEle = document.getElementById('getAllChild');
    const children = parentEle.children;
    const childNode = parentEle.childNodes;
    const firstElementChild = parentEle.firstElementChild;
    const firstChild = parentEle.firstChild;
    console.log('children=======', children);
    console.log('childNode=======', childNode);
    console.log('firstElementChild=======', firstElementChild);
    console.log('firstChild=======', firstChild);
  };

  console.log('parent');

  return (
    <div className={styles.root}>
      {/* <div className='open-btn' onClick={handleOpenNewPage}>
        打开新页面
      </div>

      <div className='get-child-btn' onClick={handleGetAllChild}>
        获取所有子节点
      </div>

      <div id='getAllChild' key={new Date()}>
        ''
        <div>1</div>
        <></>
        <div />
        <Fragment />
        <input type='text' />
        <div>2</div>
        <div></div>
        <div>3</div>
        <div></div>
        <div>4</div>
        <Child prop={prop} />
      </div> */}
      <Cache />
    </div>
  );
}
