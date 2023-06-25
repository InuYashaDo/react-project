import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';

const color = ['red', 'green', 'black', 'gray'];

export default function Carousel(props) {
  const { autoplay = true } = props;

  const [nowPage, setPage] = useState(0);
  const nowPageRef = useRef(nowPage);

  useEffect(() => {
    let timer;
    if (autoplay) {
      clearInterval(timer);

      setInterval(() => {
        handleNext();
      }, 2000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [autoplay]);

  useEffect(() => {
    nowPageRef.current = nowPage;
  }, [nowPage]);

  const handlePrev = () => {
    setPage((prePage) => (prePage - 1 < 0 ? color.length - 1 : prePage - 1));
  };

  const handleNext = () => {
    setPage((prePage) => (prePage + 1 >= color.length ? 0 : prePage + 1));
  };

  const renderPointItem = (_, index) => {
    return (
      <li
        className={`point-item ${
          index === nowPage ? 'point-item__selected' : ''
        }`}
        onClick={() => setPage(index)}
      />
    );
  };

  const renderPointPart = () => {
    return <ul className='point-list'>{color.map(renderPointItem)}</ul>;
  };

  const renderOperatePart = () => {
    return (
      <>
        <div className='operate-btn prev' onClick={handlePrev} />
        <div className='operate-btn next' onClick={handleNext} />
      </>
    );
  };

  const renderCarouselItem = (item, index) => {
    return (
      <div
        className='carousel-item'
        tabIndex={index}
        style={{ background: item }}
      />
    );
  };

  const renderWrapper = () => {
    return (
      <div className='carousel-wrapper'>
        <div
          className='carousel-container'
          style={{ transform: `translateX(-${nowPage * 300}px)` }}
        >
          {color.map(renderCarouselItem)}
        </div>
        {renderPointPart()}
        {renderOperatePart()}
      </div>
    );
  };

  return <div className={styles.root}>{renderWrapper()}</div>;
}
