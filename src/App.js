// import './wdyr.js';
import React, { useImperativeHandle } from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import pureComponentDemo from './react-xn-demo/pureComponentDemo.js';
// import CanvasDemo from './react-xn-demo/canvasDemo';
// import InterviewQuestions from './react-xn-demo/interviewQuestions';
// import BorderColor from './react-xn-demo/BorderColor/borderColor';
// import Tabs from "./antd/Tabs";
// import UseCallback from './react-xn-demo/Hooks/callbackWithmemo/useCallback';
import UseMemo from './react-xn-demo/Hooks/useMemo/useMemo';
import FuncParent from './react-xn-demo/ref/funcParent';
import ClassParent from './react-xn-demo/ref/classParent';
import CodeTest from './react-xn-demo/codeTest';
import InterView from './InterView';
import Ref from './Ref';
import TestIndex from './TestIndex';
import AdvancedGuide from './advancedGuide';
import OthersDemo from './othersDemo';
import ProjectDemo from './projectDemo';

// const { FirstDemo, SecondDemo } = Tabs;

function App() {
  return (
    <div className='App'>
      {/* <pureComponentDemo /> */}
      {/* <CanvasDemo /> */}
      {/* <InterviewQuestions /> */}
      {/* <BorderColor /> */}
      {/* <FirstDemo /> */}
      {/* <SecondDemo /> */}
      {/* <UseCallback /> */}
      {/* <UseMemo /> */}
      {/* <FuncParent /> */}
      {/* <ClassParent /> */}
      {/* <InterView /> */}
      {/* <Ref /> */}
      {/* <CodeTest /> */}
      {/* <TestIndex /> */}
      {/* <AdvancedGuide /> */}
      <OthersDemo />
      {/* <ProjectDemo /> */}
    </div>
  );
}

export default App;
