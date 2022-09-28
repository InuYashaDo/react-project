import React, { useRef, useState } from 'react';
// import debounce from '../utils/debounce'

export default function Debounce() {
  const inputRef = useRef(null);

  const debounce = (fun, delay, immediate) => {
    let timer = null;

    return (e) => {
      e.persist()

      clearTimeout(timer);
      if (immediate && !timer) {
        fun(e);
      }

      timer = setTimeout(() => {
        fun(e);
        timer = null
      }, delay);
    };
  };

  const handleChange = (e) => {
    // console.log(e);
    // console.log(inputRef.current.value);
  };

  const handleClick = (val) => {
    console.log(`我被点击了，传入的参数为${val}`);
  };

  return (
    <div>
      debounce
      <input
        type='text'
        onChange={debounce(handleChange, 500, true)}
        ref={inputRef}
      />
      <div
        style={{
          height: 100,
          width: 100,
          background: 'red',
          textAlign: 'center',
          lineHeight: '100px',
        }}
        onClick={debounce((a = 1) => handleClick(a), 1000)}
      >
        点击我
      </div>
    </div>
  );
}
