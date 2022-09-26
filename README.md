This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## intro
该项目通过react脚手架生成 react版本为16 且已经通过reject抛出所有webpack的配置 你可以按需修改自己想要的配置 该项目已经支持less及css modules。
## now branch -- interview

just for interview. you can find doc from /src/doc/interview and across translate or add interview md.
also can add js and other part demo in /src/interview then import in index to extend new demo whatever you want to add.

当前项目是为了前端面试题或者任何你觉得想要写的Demo.
你可以在/src/doc/interview目录下新增md，用来记录文字版的面试题或者demo文档
也可以在/src/interview目录下新增demo part，用来写一些你像实现的demo。记得最重要的一点你写的所有的Demo都需要在/src/interview/index.js通过es module导入。

当然目录并不是定好的，你也可以在src下新建任何你觉得需要的新目录。就像react-xn-demo 或者Ref那样。当然，你新建的目录也是属于App.js的模块，所以也要在App.js中通过es module引入你新增的模块才可以展示你想要的效果。


### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
