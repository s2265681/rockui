// 页面展示
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.scss';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// ReactDOM.render(
// <React.StrictMode>
//     <App/>
// </React.StrictMode>,
// document.getElementById('root')
// );
// serviceWorker.unregister();
// 打包组件发布
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
export { default as Button } from './components/Button';
export { default as Menu } from './components/Menu';
export { default as Icon } from './components/Icon';
export { default as Alert } from './components/Alert';
export { default as Input } from './components/Input';
export { default as Tabs } from './components/Tabs';
export { default as Bg } from './components/Bg';
export { default as Spider } from './components/Spider';
export { default as Table } from './components/Table';
export { default as Spin } from './components/Spin';
export { default as Animation } from './components/Animation';
export { default as Commission } from './components/Commission';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Upload } from './components/Upload';
export { default as Progress } from './components/Progress';
// // 遮照， 交换排序组件， 操作block组件 
export { default as Mask } from './components/Mask';
export { default as DragSortCom } from './components/DragSortCom';
export { default as HandleBlock } from './components/HandleBlock';
