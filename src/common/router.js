import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageA from 'Src/pages/PageA';
import App from 'Src/App';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App name="xixi" age={27} />}>
          <Route index element={<PageA />} />
          <Route path="pageA" element={<PageA />} />
          <Route path="pageb" element={<PageA />} />
          {/* <Redirect element={<div>哈哈空白页面</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
