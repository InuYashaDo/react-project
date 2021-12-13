// import './wdyr.js';
import React from "react";
import "./App.css";
// import pureComponentDemo from './react-xn-demo/pureComponentDemo.js';
// import CanvasDemo from './react-xn-demo/canvasDemo';
// import InterviewQuestions from './react-xn-demo/interviewQuestions';
// import BorderColor from './react-xn-demo/BorderColor/borderColor';
import Tabs from "./antd/Tabs";

const { FirstDemo, SecondDemo } = Tabs;

function App() {
  return (
    <div className="App">
      {/* <pureComponentDemo /> */}
      {/* <CanvasDemo /> */}
      {/* <InterviewQuestions /> */}
      {/* <BorderColor /> */}
      {/* <FirstDemo /> */}
      <SecondDemo />
    </div>
  );
}

export default App;
