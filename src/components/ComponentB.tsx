import React from 'react';
import { minus } from 'Utils/math';

interface IProps {
  a: number;
  b: number;
}

export default function ComponentB(props: IProps) {
  const { a, b } = props;
  const num = minus(a, b);

  return <div>i am componentB, my num is {num} </div>;
}
