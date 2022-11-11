import { registerMicroApps, start } from 'qiankun';
import render from './App';

render();

registerMicroApps([
  {
    name: 'reactApp', // app name registered
    entry: '//localhost:4000',
    container: '#child-container',
    activeRule: '/react',
  },
  // {
  //   name: 'vue app',
  //   entry: { scripts: ['//localhost:7100/main.js'] },
  //   container: '#yourContainer2',
  //   activeRule: '/vueRule',
  // },
]);

start();
