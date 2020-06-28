import React from 'react';

if (process.env.NODE_ENV === 'development') { // 仅在本地开发中启用
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}