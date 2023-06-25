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
import Sort2 from './sort2';
import DataStructure from './dataStructure';
import Browser from './browser';
import EventComp from './event';
import Async from './async';
import Responsive from './responsive';
import Promise3 from './promise3';
import Promise4 from './promise4';
import Promise5 from './promise5';
import New2 from './new2';
import Instance2 from './instance2';
import Extends3 from './extends3';
import Others from './others';
import Copy3 from './copy3';

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
  {
    Comp: Sort2,
    title: 'sort2',
  },
  {
    Comp: DataStructure,
    title: 'dataStructure',
  },
  {
    Comp: Browser,
    title: 'browser',
  },
  {
    Comp: EventComp,
    title: 'eventComp',
  },
  {
    Comp: Async,
    title: 'async',
  },
  {
    Comp: Responsive,
    title: 'responsive',
  },
  {
    Comp: Promise3,
    title: 'promise3',
  },
  {
    Comp: Promise4,
    title: 'promise4',
  },
  {
    Comp: Promise5,
    title: 'promise5',
  },
  {
    Comp: New2,
    title: 'new2',
  },
  {
    Comp: Instance2,
    title: 'instance2',
  },
  {
    Comp: Extends3,
    title: 'extends3',
  },
  {
    Comp: Others,
    title: 'others',
  },
  {
    Comp: Copy3,
    title: 'copy3',
  },
];

const nowShow = 'copy3';

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
