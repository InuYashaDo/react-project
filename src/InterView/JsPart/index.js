import React from 'react';
import Debounce from './debounce';
import Throttle from './throttle';
import This from './this';
import Extend from './extend';
import Instance from './instance';
import Copy from './copy';
import New from './new';
import Promise from './promise';
import Ajax from './ajax';
import Sort from './sort';
import EventLoopComp from './eventLoop';
import Type from './type';
import Copy2 from './copy2';
import Extends2 from './extends2';

const compList = [
  {
    Comp: Debounce,
    title: 'debounce',
  },
  {
    Comp: Throttle,
    title: 'throttle',
  },
  {
    Comp: This,
    title: 'this',
  },
  {
    Comp: Extend,
    title: 'extend',
  },
  {
    Comp: Instance,
    title: 'instance',
  },
  {
    Comp: Copy,
    title: 'copy',
  },
  {
    Comp: New,
    title: 'new',
  },
  {
    Comp: Promise,
    title: 'promise',
  },
  {
    Comp: Ajax,
    title: 'ajax',
  },
  {
    Comp: Sort,
    title: 'sort',
  },
  {
    Comp: EventLoopComp,
    title: 'eventLoop',
  },
  {
    Comp: Type,
    title: 'type',
  },
  {
    Comp: Copy2,
    title: 'copy2',
  },
  {
    Comp: Extends2,
    title: 'extends2',
  },
];

const nowShow = 'extends2';

export default function index() {
  const renderComp = (item) => {
    const { Comp, title, params } = item;
    return nowShow === title ? (
      <div
        style={{
          width: 500,
          height: 500,
          borderWidth: '1px',
          borderStyle: 'dotted',
        }}
        key={title}
      >
        这是{title}部分
        <Comp {...params} />
      </div>
    ) : null;
  };

  return <div>{compList.map((item) => renderComp(item))}</div>;
}
