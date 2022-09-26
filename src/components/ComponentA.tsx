import React from 'react';
import { add } from 'Utils/math';

interface IProps {
  a: number;
  b: number;
}

export default function ComponentA(props: IProps) {
  const { a, b } = props;
  const num = add(a, b);

  return <div>my name is ComponentA, my num is {num}</div>;
}
