import React, { useEffect, useState, useRef } from 'react';
import { Input, Button } from 'antd';
import { Navigate } from 'react-router-dom';
import btts from '../../utils/bdAudio';
import styles from './index.less';

let audio: any;
const ws = new WebSocket('ws://127.0.0.1:3000/websocket/test');

export default function Index() {
  const ref = useRef(null);

  const [num, setNum] = useState(1);

  const [nowName, setNowName] = useState('');
  const [nameList, setNameList] = useState([]);

  ws.onopen = e => {
    console.log(`WebSocket 连接状态： ${ws.readyState}`);
  };

  ws.onmessage = data => {
    setNowName(data.data);
    setNameList(nameList.concat(data.data));
  };

  ws.onclose = data => {
    console.log('WebSocket连接已关闭');
    console.log(data);
  };

  const handleSend = () => {
    ws.send(ref.current.input.value);
  };

  // 合成按钮
  function tts() {
    let text = '哈哈哈哈哈哈哈哈哈好';

    // 调用语音合成接口
    // 参数含义请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
    audio = btts(
      {
        tex: `学生哈哈核酸异常,健康码异常,进入校门`,
        tok: '24.a36cb3513726d16c4904cf72600c375e.2592000.1663482337.282335-27080079',
        spd: 5,
        pit: 5,
        vol: 15,
        per: 5003,
      },
      {
        volume: 0.3,
        autoDestory: true,
        timeout: 10000,
        hidden: true,
        onInit: function (htmlAudioElement: any) {
          htmlAudioElement.setAttribute('muted', 'muted');
        },
        onSuccess: function (htmlAudioElement: any) {
          audio = htmlAudioElement;
          // htmlAudioElement.play();
          // document.getElementById('audio-play-btn')?.click();
        },
        // onError: function (text: string) {
        //   alert(text);
        // },
        // onTimeout: function () {
        //   alert('timeout');
        // },
      }
    );
  }

  useEffect(() => {
    // tts();
  }, []);

  // useEffect(() => {
  //   console.log('====================================');
  //   console.log('last effect');
  //   console.log('====================================');

  //   return () => {
  //     console.log('====================================');
  //     console.log('unmout effect');
  //     console.log('====================================');
  //   };
  // }, [num]);

  return (
    <div className={styles.root}>
      <Input ref={ref} />
      <Button onClick={handleSend}>发送</Button>
      {/* index
      <div className="testClass">哈哈</div>
      <Input
        onChange={e => {
          setNum(Number(e.target.value));
        }}
      /> */}
      {/* <div onClick={() => ws.send('hh')}>发送信息</div> */}
      {/* <div
        onClick={() => {
          audio.play();
        }}
        id="audio-play-btn"
      >
        播放
      </div> */}
      <div className="name">
        {nameList.map(item => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
}
