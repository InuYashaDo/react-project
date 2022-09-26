import React from 'react'
import { createRoot } from 'react-dom/client';
import Router from 'Src/common/router';

const root: any = createRoot(document.querySelector('#root') as HTMLElement);

if (module && module.hot) {
  module.hot.accept();
}

root.render(<Router />);
