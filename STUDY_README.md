# 新建项目

create-react-app project_show --typescript

# UI

zhongguose.com

## 样式解决方案分析

- Inline CSS
- CSS in JS
- styled Component
- Sass/Less

## 样式文件结构

styles/
\_variables.scss(各种变量以及可配置设置)
\_minxins.scss(全局 mixins)
\_functions.scss(全局 functions)
components/
Button/
style.scss(组件单独的样式)

## 创建自己组件库的色彩体系

- 系统色板 - 基础色斑 + 中性色板
- 产品色斑 - 品牌色 + 功能色板

## Boostrap 的色彩体系

## 组件库的色彩体系

#006EFD
#6C757D
#52C41A
#FADB14
#DC3545
#17A2B8

## 安装预处理器

npm install node-sass --save

rem 是和根元素关联的
1rem = 16px

## normalize.css/css.reset

// styles/\_reboot.scss
提供了一个跨浏览器的样式的统一方案
保护浏览器有用样式
css.reset 是全部抹掉浏览器样式
修复浏览器 bug
优化 css

## classnames

[github](https://www.npmjs.com/package/classnames)
根据 true or false
npm install classnames --save
npm install @types/classnames --save

## 测试

### 国内互联网测试现状

- 重视成都不足
- 没有时间
- 不会写测试

### 测试的重要性

- 高质量的代码
- 更早的发现 Bug、减少成本
- 让重构和升级变得更加容易可靠
- 开发流程更加敏捷

### React 组件特别适合单元测试

- Component-组件
- Function-函数
- 单向数据流

### Jest 通用测试框架

https://jestjs.io/

Jest is a delightful javascript Testing Framework
断言：通过判断我们计算的值是否于预期相等

npx jest jest.test.js --watch

npm install --save-dev @testing-library/jest-dom

## Icon

雪碧图--》font-icon---》svg 图标
font-icon 图标 会有奇怪 bug
Font
react-fontawesome
[github](https://github.com/FortAwesome/react-fontawesome/)
[web](https://fontawesome.com/)

$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
\$ npm i --save @fortawesome/react-fontawesome

// 导入
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
<FontAwesomeIcon icon={faCoffee} size="lg" />

## Storybook for react

[Storybook for react](https://storybook.js.org/guides/guide-react/)

- 安装
  > cnpm i @storybook/cli -g
  > sb init --type react_scripts
  > npm install --save-dev @storybook/react
  > 或
  > npx -p @storybook/cli sb init

git diff

- 运行
  > npm run storybook

## 安装 addon-info

文档中添加详细信息

> npm i -D @storybook/addon-info
> npm install --save @types/storybook/addon-info

## react-docgen

文档生成器
cnpm install --save-dev react-docgen
安装 typescript 支持
cnpm install --save-dev react-docgen-typescript-loader

## 添加注释

js doc
简单模式
/\*\*

- Represents a book
  \*/
  复杂模式
  /\*\*
- Represents a book
- @constructor
- param {string} title - the title of book
- param {string} author - the author of book
  \*/

## AutoComponent Input 表单

## build ts

- "build-ts":"tsc -p tsconfig.build.json",

## build css

Usage

node-sass

Example
node-sass src/style.scss dist/style.css
"build-css":"node-sass ./src/styles/index.scss ./build/index.css"

## npm rimraf package 删除文件

npm i rimraf
"clean":"rimraf ./build"

## 测试 npm link

rockui 文件夹下
cnpm link
运行到本地 node_modules
然后安装 rockui
npm link rockui

package.json 中添加入口文件
"main":"build/index.js",
"module":"build/index.js",
"types":"build/index.d.ts",

npm link rockui
/Users/shangjiawei/MyGithub/Project/vuepress/code/React_Hook_UI/rockui/node_modules/rockui -> /usr/local/lib/node_modules/rockui -> /Users/shangjiawei/MyGithub/Project/vuepress/code/React_Hook_UI/rockui

npm link bug

Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:

1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
   See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.

项目 react 两个版本错误

## npm

npm config ls
npm adduser
shangjiaweidawang
邮箱
npm whoami

## public

语义化版本 2.0.0
semver.org/lang/zh-CN/
主版本号：不兼容的 API 修改
次版本号：向下兼容的
修订号：fix

// package.json

"description":"React component library rock",
"author":"rockshang",
"keywords":[
"Component",
"UI",
"React",
"Rock"
],
"homepage":"https://github.com/s2265681/code/tree/master/React_Hook_UI/rockui",
"repository":{
"type":"git",
"url":"https://github.com/s2265681/code/tree/master/React_Hook_UI/rockui"
},
"files":[
"dist"
],

publish 前的钩子函数
"prepublish":"npm run build",
"private": false,

npm publish

    === Tarball Details ===
    npm notice name:          rockui
    npm notice version:       0.1.0
    npm notice package size:  15.3 kB
    npm notice unpacked size: 55.7 kB
    npm notice shasum:        3855f443619c979cb0bfa51fbc3179a5d19d5b7a
    npm notice integrity:     sha512-5F8v0RH8o6zA5[...]7DV/nVsoaAMSQ==
    npm notice total files:   43

## 优化安装的库

dependencies：工作模式的工作流（安装时都会安装，运行时必须的）npm install 时都会解析下载
devDependencies:开发模式的工作流（单元测试、语法转换、程序构建、语法）与核心业务模式和模块无关，但是支撑着开发过程,本地 npm install 时会安装

## eslint

npm i eslint --save-dev
"lint": "eslint --ext js,ts,tsx src --max-warnings 5",

[文档](eslint.org/docs/user-guide/command-line-interface#ext)

## 修改 npm run test

变成结果导向的
[文档](create-react-app.dev/docs/running-tests/#continuous-interation)

跨平台
npm i cross-env --save-dev
把 watch 改成结果
CI=true npm test

npm run test:nowatch && npm run lint && npm run build && npm publish

## husky

开发中提交代码的检测
npm i husky --save-dev
// package.json
"husky":{
"hooks":{
"pre-commit":"npm run test:nowatch && npm run lint"
}
},

## 上传 storybook 文档到服务器

"scp-storybook":"scp -r ./storybook-static root@39.96.71.193:/home/rockui"
"scp-storybook":"scp -i ~/.ssh/id_myserver-rsa.pem -r ./storybook-static root@39.96.71.193:/home/rockui"

scp -r ./storybook-static/\* root@39.96.71.193:/home/project/rockui

## 使用 npm-check 更新项目依赖

npm-check -u

## Table 问题记录

1、 table-thead 中的 th 与 tbody 中的 td 宽度对不齐？

tbody 根据内容自适应，flex 布局，另外可以自定义宽度
thead 的宽度，需要通过操作 dom 节点？虚拟 dom，通过 hooks 中的 useRef 获得，将宽度付给 head 解决
antd 同样具有该问题，表头字段特别长的时候，会重新计算 head 的单元格的宽度

2、table 中 clounms 全部设置宽度后，导致对不齐的问题？

3、table 中 clounms 第一列宽度不设置，后面设置出问题，需要设置 justfiy-content:flex-end

## Animation 问题记录

组件内部销毁，淡出，销毁事件太快，无法控制，
只能外部传入 isShow
bug: 多个 Animation 组件使用时，干扰 isShow，未解决

## 浏览器事件

阻止事件冒泡
事件冒泡，点击里面的元素，会向父级事件也调用，阻止事件冒泡很重要，用 e.stopPropagation
// 阻止事件冒泡
e.stopPropagation();
事件捕获，点击内层的或者外层的元素，事件会从外部向下面的内容依次的事件调用，可以利用这个做很多事
阻止捕获，也可以用 e.stopPropagation
也可以用 e.stopImmediatePropagation

//阻止默认事件
e.preventDefault()

// 阻止事件捕获
[](https://www.cnblogs.com/zhuzhenwei918/p/6139880.html)

Commission 的时候，每次修改 content 的时候，需要 setData,Input 的 focus 会消失，加了一个 autoFocus 解决，每次更新后会自动 focus

Commission 两个外层的连接到一起，样式对不齐问题，，解决方案，插入一个 div 元素去撑出空间，判断那个时候循环时机，根据 index!==0&&index!==data.length data 还要通过 map 判断是否有 children，通过 map 拿到返回结果

解决 input 输入无法输入中文，
切光标会刷新到最后面：原因是每次改变 input 的值的时候触发了更新导致的出错。

：fix method 将 value 改为 defaultValue 非受控的形式，不去通过 setDate 改变组件值，不去重发更新则可以。
将更新移到了 onBlur 里面，通过一个变量判断。如果有更改，去 setData，没有更改不去触发，
解决性能问题的同时解决了 bug
。。。

## renderDOMServer SSR 服务端渲染

react 的 DOM 转化成 html
let domString = ReactDOMServer.renderToString(<div>react element</div>)

<div dangerouslySetInnerHTML={__html:domString}>
http://www.react-china.org/

// const wrapperStyles: React.CSSProperties={
// padding:"20px 40px"
// }

storybook/react

npm webpack 版本过高---error
[fix](https://blog.csdn.net/muzi190/article/details/84108714)
// .env
SKIP_PREFLIGHT_CHECK=true

npm prune

error

The react-scripts package provided by Create React App requires a dependency:
"webpack": "4.42.0"

fixed:
npm un webpack
npm un webpack-cli
npm un webpack-dev-server

npm i webpack@4.19.1
npm i webpack-cli
npm i webpack-dev-server@4.42.0

## scp

scp -i ~/.ssh/id_myserver-rsa.pem -r ./storybook-static/\* root@39.96.71.193:/home/project/rockui

## hooks 自定义 hooks

## 原生 XHR 和\$.ajax

- XHR —— 设计粗糙，配置和调用混乱，不注重分离

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://test.me");
xhr.responseType = "json";

xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log(xhr.error);
};

xhr.send();
```

- \$.ajax —— jq 操作 dom，得补偿式

```js
$.ajax({
  type: "POST",
  url: "http://test.me",
  data: {},
  dataType: "json",
  success: function() {},
  error: function() {},
});
```

- fetch —— 看起来很美， 比较底层，还要封装，缺点：只对请求报错，对 400，500 当作成功， 还要封装处理，默认不带 cookie，不支持 abort，不支持超时控制，没有办法原生检测请求进度

```js
fetch("http://test.me")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(e) {
    console.log(e, "error");
  });
```

- axios —— 支持 promise、支持 ts
  http://github.com/axios/axios

```js
// 表单上传
import axois from 'axios';
const formData = new FormData() 
// axois.post("https://jsonplaceholder.typicode.com/posts",       formData,{
//     headers: {
//       'Content-Type':'multipart/form-data'
//     }
// })
const files = e.target.files;
if (files) {
  const uploadedFile = files[0];
  const formData = new FormData(); // 模拟表单数据，xhr，创建form的一些数据
  formData.append(uploadedFile.name, uploadedFile);
  axois.post("https://jsonplaceholder.typicode.com/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
```

## 在线 mock server

JSONPlaceholder
Mock.io

## 表单提交

```js
<form
  method="post"
  encType="multipart/form-date" // 发送文件的格式  // 二进制文件最好选这个，还有application/x-www.form-urlencoded(the default) 不是很好
  action="https://jsonplaceholder.typicode.com/posts"
>
  <input type="file"></input>
  <button type="submit">Submit</button>
</form>

```


