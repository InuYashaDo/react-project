import React from 'react';
import ReactDom from 'react-dom';
import BasicLayout from './pages/layout';
import 'antd/dist/antd.css';

function App() {
  ReactDom.render(<BasicLayout />, document.getElementById('content-root'));
}
export default App;
