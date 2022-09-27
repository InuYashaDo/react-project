import React from 'react';

export default function Type() {
  const myRealType = (check) => {
    if (check === null) return String(check);

    return typeof check === 'object'
      ? Object.prototype.toString
          .call(check)
          .replace(/^\[object (\S+)\]$/, '$1')
          .toLowerCase()
      : typeof check;
  };

  console.log(myRealType({}));
  console.log(myRealType('123'));
  console.log(myRealType(new Date()));
  console.log(myRealType(null));
  console.log(myRealType(function () {}));
  console.log(myRealType(undefined));
  console.log(myRealType([]));

  return <div>hh</div>;
}
