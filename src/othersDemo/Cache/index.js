import React, { useState } from 'react';
import { Button } from 'antd';

const img =
  'https://access-center.oss-cn-hangzhou.aliyuncs.com/440101-S000011/1661752683683.png';

export default function Cache() {
  const [key, setKey] = useState(1);

  const handleUpdate = () => {
    setKey((pre) => (pre + 1) % 5);
  };

  return (
    <div>
      <img src={`${img}?key=${key}`} alt='' />
      <Button onClick={handleUpdate}>更新图片key{key}</Button>
    </div>
  );
}
