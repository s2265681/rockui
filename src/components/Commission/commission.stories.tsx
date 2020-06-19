import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from '@storybook/addon-actions';
import Commission from "./commission";
import Icon from '../Icon';

const data1 = [
  {
    id: 1,
    title: "2020年",
    content: "工作总结",
  },
  {
    id: 2,
    title: "2021年",
    content: "工作总结",
  },
];

const data2 = [
  {
    id: 1,
    title: "2020年",
    content: "工作总结",
    children: [
      {
        id: 2,
        title: "1月",
        content: "1月份提纲",
      },
    ],
  },
];

const data3 = [
  {
    id: 1,
    title: "2020年",
    content: "工作总结",
    children: [
      {
        id: 2,
        title: "1月",
        content: "1月份提纲",
      },
      {
        id: 3,
        title: "2月",
        content: "2月份提纲",
        children: [
          {
            id: 2,
            title: "1月",
            content: "1月份提纲",
          },
        ],
      },
    ],
  },
];

const data33 = [
  {
    id: 1,
    title: "第一章",
    content: "html 简介",
    children: [
      {
        id: 2,
        title: "html 常用标签",
        content: (
          <p style={{ backgroundColor: "#ff0" }}>
            <div style={{ backgroundColor: "#ff0" }}>注释</div>
            <div style={{ color: "#f00" }}> h1~h6</div>
            <div style={{ color: "#f0f" }}>标题标签</div>
            <h3>段落标签</h3>
          </p>
        ),
      },
      {
        id: 3,
        title: "Input",
        content: <div><Icon icon="coffee"/>2月份提纲</div>,
        children: [
          {
            id: 4,
            title: "button",
            content: <img style={{width:'100px',height:'100px'}} src="http://t9.baidu.com/it/u=4169540006,4220376401&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1591765858&t=38242a64e963c63baeed7dba7d76a1f1"></img>,
            children: [
              {
                id: 5,
                title: "button",
                content: "button种类2",
                children: [
                  {
                    id: 6,
                    title: "button种类",
                    content: "button 按钮1",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];


const data333 = [
  {
    id: 1,
    title: "2020年",
    content: "工作总结",
    children: [
      {
        id: 2,
        title: "markdown语法测试",
        content: "# 一级标题  ## 二级标题  ### 三级标题",
      },
      {
        id: 3,
        title: "语法",
        content:
          "![图片](http://img0.imgtn.bdimg.com/it/u=2624811453,2350881067&fm=26&gp=0.jpg)",
      },
      {
        id: 4,
        title: "百度",
        content: "[百度]](http://www.baidu.com)",
      },
      {
        id: 5,
        title: "表格",
        content: "name | 价格 |  数量  \r  -|-|-    \r 香蕉 | $1 | 5 |   \r 苹果 | $1 | 6 |   \r 草莓 | $1 | 7 |",
      },
    ],
  },
];


const data4 = [
  {
    id: 1,
    title: "2020年",
    content: "工作总结",
    isDone: false,
    children: [
      {
        id: 2,
        title: "1月",
        content: "1月份提纲",
        isDone: true,
        children: [
          {
            id: 4,
            title: "11日",
            content: "11提纲",
            isDone: true,
          },
          {
            id: 5,
            title: "12日",
            content: "12提纲+++++",
            isDone: false,
          },
          {
            id: 41,
            title: "13日",
            content: "11提纲",
            isDone: true,
          },
          {
            id: 52,
            title: "14日",
            content: "12提纲+++++",
            isDone: false,
          },
        ],
      },
      {
        id: 3,
        title: "2月",
        content: "1月份提纲",
        children: [
          {
            id: 47,
            title: "11日",
            content: "11提纲",
            isDone: true,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "2021年",
    content: "工作总结",
    isDone: true,
    children: [
      {
        id: 7,
        title: "1月",
        content: "1月份提纲",
        children: [
          {
            id: 8,
            title: "11日",
            content: "11提纲",
            isDone: true,
          },
          {
            id: 9,
            title: "12日",
            content: "12提纲+++++",
            isDone: false,
          },
        ],
      },
      {
        id: 10,
        title: "2月",
        content: "1月份提纲",
      },
    ],
  },
];

const defaultCommissio1 = () => (
  <div className="block alerts">
    <Commission dataSource={data1} />
  </div>
);
const defaultCommissio2 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data1} theme="info" />
      <Commission dataSource={data1} theme="danger" />
      <Commission dataSource={data1} theme="warning" />
      <Commission dataSource={data1} theme="primary" />
    </div>
  </div>
);
const defaultCommissio3 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data2} theme="info" />
      <Commission dataSource={data3} theme="warning" />
      <Commission dataSource={data33} theme="danger" />
    </div>
  </div>
);

const defaultCommissio4 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data4} theme="info" />
    </div>
  </div>
);

const defaultCommissio5 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data4} isHandle theme="info" />
    </div>
  </div>
);

const defaultCommissio6 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data33} isExpand theme="info" />
    </div>
  </div>
);

const defaultCommissio7 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data33} theme="danger" isEditable isHandle/>
    </div>
  </div>
);


const defaultCommissio8 = () => (
  <div className="block alerts">
    <div style={{ display: "flex" }}>
      <Commission dataSource={data333} theme="info" isEditable isHandle/>
    </div>
  </div>
);

storiesOf("Commissio 日程待办", module)
  .add("简单的待办", defaultCommissio1)
  .add("简单的待办--配置主题色", defaultCommissio2)
  .add("创建的日程", defaultCommissio3)
  .add("展示计划完成情况", defaultCommissio4)
  .add("鼠标滑入操作 isHandle", defaultCommissio5)
  .add("操作是否可以可展开 isExpand", defaultCommissio6)
  .add("点击文字具有编辑功能，支持自定义html，输入isEditable", defaultCommissio7)
  .add("新增支持markdown语法", defaultCommissio8);
