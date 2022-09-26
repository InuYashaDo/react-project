import React, { useState, lazy, Suspense, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestA } from './services/test';
import PageA from 'Src/pages/PageA/index';

const ComponentA = React.lazy(() => import('Components/ComponentA'));
const ComponentB = React.lazy(() => import('Components/ComponentB'));

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const [showB, setShowB] = useState(false);
  const { name, age } = props;

  const navigate = useNavigate();

  const handleA = () => {
    requestA('http://127.0.0.1:5040/api').then((res: any) => {
      console.log(res);
    });
  };

  const handleJump = () => {
    navigate('/pageA');
  };

  // client.on('connectFailed', function (error: string) {
  //   console.log('Connect Error: ' + error.toString());
  // });

  // client.on('connect', function (connection: any) {
  //   console.log('WebSocket Client Connected');
  //   connection.on('error', function (error: string) {
  //     console.log('Connection Error: ' + error.toString());
  //   });
  //   connection.on('close', function () {
  //     console.log('echo-protocol Connection Closed');
  //   });
  //   connection.on('message', function (message: any) {
  //     if (message.type === 'utf8') {
  //       console.log("Received: '" + message.utf8Data + "'");
  //     }
  //   });
  // });

  // client.connect('ws://localhost:8080/', 'echo-protocol');

  return (
    <Suspense fallback={<div>loading...</div>}>
      {/* 姓名：{name}年龄：{age}
      <ComponentA a={5} b={2} />
      {showB && <ComponentB a={4} b={2} />}
      <button onClick={() => setShowB(!showB)}>
        {showB ? '关闭2' : '展示2'}
      </button>
      <button onClick={handleA}>点我发起a请求</button>
      <button onClick={handleJump}>点击跳转A页面</button> */}
      <PageA />
    </Suspense>
  );
}
export default App;
