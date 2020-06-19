import React from "react";
import Button from "./components/Button/button";
import Table from "./components/Table";
import "./index.css";
// import Spin from './components/Spin'
var dataSource = [
    {
        id: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
        type: 1,
        description: "胡彦斌是西湖区湖底公园1号的",
        Pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
    },
    {
        id: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
        type: 2,
        description: "胡彦祖是西湖区湖底公园1号的",
        Pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
    },
    {
        id: "3",
        name: "王祖蓝",
        age: 22,
        address: "西湖区湖底公园1号",
        type: 3,
        description: "王祖蓝是西湖区湖底公园1号的",
        Pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
    },
    {
        id: "4",
        name: "王祖蓝",
        age: 22,
        address: "西湖区湖底公园1号",
        type: 3,
        description: "王祖蓝是西湖区湖底公园1号的",
        Pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
    },
    {
        id: "5",
        name: "王祖蓝",
        age: 22,
        address: "西湖区湖底公园1号",
        type: 3,
        description: "王祖蓝是西湖区湖底公园1号的",
        Pic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
    },
];
// columns
var columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "图片",
        dataIndex: "Pic",
        key: "Pic",
        // width:300,
        render: function (t) { return (React.createElement("img", { style: { width: 150, height: 150 }, src: t, alt: t })); },
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 100,
    },
    {
        title: "住址",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        // width:100,
        render: function (t, r, i) {
            // console.log(t,r,i)
            return (React.createElement("span", { style: { color: "#f00" } }, t === 1 ? "蔬菜" : t === 2 ? "水果" : "主食"));
        },
    },
];
var data1 = [
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
                content: "![图片](http://img0.imgtn.bdimg.com/it/u=2624811453,2350881067&fm=26&gp=0.jpg)",
            },
            {
                id: 4,
                title: "百度",
                content: "[百度]](http://www.baidu.com)",
            },
            {
                id: 6,
                title: "百度",
                content: (React.createElement("div", null,
                    React.createElement(Button, { btnType: "default" }, "toggle Animate"))),
            },
            {
                id: 5,
                title: "表格",
                content: "name | 价格 |  数量  \r  -|-|-    \r 香蕉 | $1 | 5 |   \r 苹果 | $1 | 6 |   \r 草莓 | $1 | 7 |",
            },
        ],
    },
];
// name | 价格 |  数量
// -|-|-
// 香蕉 | $1 | 5 |
// 苹果 | $1 | 6 |
// 草莓 | $1 | 7 |
var App = function () {
    // const [toggle, setToggle] = useState(true);
    // const [_newData, setNewDate] = useState(data1);
    // const planChange = (e: any, itemId: any, _newData: any) => {
    // setNewDate(_newData);
    // };
    return (React.createElement("div", { className: "App" },
        React.createElement(Table, { dataSource: dataSource, columns: columns, borderd: true, 
            // isTheme={"sepia(.6)"}
            scroll: { y: 800 }, isDrag: true })));
};
export default App;
