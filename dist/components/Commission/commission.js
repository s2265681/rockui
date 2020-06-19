var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Input from "../Input";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import Markdown from 'react-markdown/with-html';
import 'highlight.js/styles/solarized-light.css';
import Util from './util';
var key = 0;
var ischangeData = [];
var findMaxArr = [];
/**
 *
 * @param props  dataSource | theme | isHandle | isExpand | isEditable
 */
var Commission = function (props) {
    var _a;
    var className = props.className, theme = props.theme, dataSource = props.dataSource, isHandle = props.isHandle, onChange = props.onChange, isExpand = props.isExpand, isEditable = props.isEditable, restProps = __rest(props, ["className", "theme", "dataSource", "isHandle", "onChange", "isExpand", "isEditable"]);
    var _b = useState(dataSource), _dataSource = _b[0], setDate = _b[1];
    var _c = useState(), currentId = _c[0], setCurrentId = _c[1];
    var _d = useState(), clickCurrentId = _d[0], setClickCurrentId = _d[1];
    var _e = useState(""), whichInput = _e[0], setWhichInput = _e[1];
    // 传入更新的date的时候
    useEffect(function () {
        setDate(_dataSource.slice());
        findAllId(_dataSource);
    }, [dataSource]);
    var classes = classNames("commission", className, (_a = {},
        _a["commission-" + theme] = theme,
        _a));
    // 更改代办事项状态
    var radioChange = function (e, itemId, index) {
        // 阻止事件冒泡
        e.stopPropagation();
        var _newData = changeEveryVal(itemId, _.cloneDeep(_dataSource), "RadioChange");
        onChange && onChange(e, itemId, _newData);
        setDate(_newData);
    };
    // 删除代办项
    var deleteCurrentItem = function (e, itemId, index) {
        // 阻止事件冒泡捕获
        e.stopPropagation();
        var _newData = changeEveryVal(itemId, _.cloneDeep(_dataSource), "deleteItem");
        onChange && onChange(e, itemId, _newData);
        setDate(_newData);
    };
    // 是否显示title中的content
    var handleShowContent = function (e, itemId, index) {
        var _newData = changeEveryVal(itemId, _.cloneDeep(_dataSource), "isExtend");
        setDate(_newData);
    };
    // 修改内容的值
    var changeInputValue = function (e, itemId, inputType) {
        var value = e.target.value;
        // 阻止事件冒泡捕获
        e.stopPropagation();
        // if(!value)return
        ischangeData = changeEveryVal(itemId, _.cloneDeep(_dataSource), "changeInputValue", value, inputType);
    };
    // 新增节点
    var handleAddDot = function (e, itemId, index, type) {
        e.stopPropagation();
        //  let result =  prompt('新增同级节点还是子节点？, 1代表子节点，2代表同级节点','1')
        if (type === 1) {
            addToChildrenDot(e, itemId, index);
        }
        else if (type === 2) {
            addToBottomDot(e, itemId, index);
        }
    };
    var addToBottomDot = function (e, itemId, index) {
        var _newData = changeEveryVal(itemId, _.cloneDeep(_dataSource), "handleAddBottomDot");
        onChange && onChange(e, itemId, _newData);
        setDate(_newData);
        setClickCurrentId(-1);
    };
    // 递归遍历给下面的children里面都加上isContent
    var addIsContent = function (array, type) {
        array.forEach(function (el) {
            el.isContent = !type;
            if (el.children && el.children instanceof Array) {
                addIsContent(el.children, type);
            }
        });
        return array;
    };
    var addToChildrenDot = function (e, itemId, index) {
        var _newData = changeEveryVal(itemId, _.cloneDeep(_dataSource), "handleAddChildrenDot");
        onChange && onChange(e, itemId, _newData);
        setDate(_newData);
        setClickCurrentId(-1);
    };
    // 获取所有的id值
    var findAllId = function (_arr) {
        for (var i = 0; i < _arr.length; i++) {
            if (_arr[i].children instanceof Array) {
                findAllId(_arr[i].children);
                findMaxArr.push(_arr[i].children[0] && _arr[i].id);
            }
            else {
                findMaxArr.push(_arr[i] && _arr[i].id);
            }
            findMaxArr = findMaxArr.filter(function (el) { return el !== undefined; });
        }
        return findMaxArr;
    };
    var handleClick = function (e, itemId, index) {
        console.log(e, itemId, index);
        handleShowContent(e, itemId, index);
    };
    // 操作数组
    var changeEveryVal = function (id, arr, type, value, inputType) {
        if (value === void 0) { value = ""; }
        if (inputType === void 0) { inputType = ""; }
        var _a, _b, _c, _d;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].children instanceof Array) {
                changeEveryVal(id, arr[i].children, type, value, inputType);
            }
            if (((_a = arr[i]) === null || _a === void 0 ? void 0 : _a.id) === id && type === "RadioChange") {
                arr[i].isDone = !arr[i].isDone;
            }
            if (((_b = arr[i]) === null || _b === void 0 ? void 0 : _b.id) === id && type === "isExtend") {
                var arrA = arr[i];
                arrA.isContent = !arrA.isContent;
                if (arrA.children && arrA.children instanceof Array) {
                    addIsContent(arrA.children, !arrA.isContent);
                }
            }
            if (((_c = arr[i]) === null || _c === void 0 ? void 0 : _c.id) === id && type === "changeInputValue") {
                if (inputType === "content")
                    arr[i].content = value;
                if (inputType === "title")
                    arr[i].title = value;
            }
            if (arr[i].id === id && type === "handleAddBottomDot") {
                var ids = findAllId(_dataSource);
                var idsLength = ids.length;
                var maxId = ids.sort(function (a, b) { return a - b; })[idsLength - 1];
                var item = { id: maxId + 1, title: '', content: '' };
                var idx = arr.findIndex(function (el) { var _a; return ((_a = el) === null || _a === void 0 ? void 0 : _a.id) === id; });
                arr.splice(idx + 1, 0, item);
            }
            if (((_d = arr[i]) === null || _d === void 0 ? void 0 : _d.id) === id && type === "handleAddChildrenDot") {
                var ids = findAllId(_dataSource);
                var idsLength = ids.length;
                var maxId = ids.sort(function (a, b) { return a - b; })[idsLength - 1];
                var idx = arr.findIndex(function (el) { var _a; return ((_a = el) === null || _a === void 0 ? void 0 : _a.id) === id; });
                var item = { id: maxId + 1, title: '', content: '' };
                if (arr[idx].children)
                    arr[idx].children.unshift(item);
                if (!arr[idx].children)
                    arr[idx].children = [item];
            }
            if (arr[i] && arr[i].id === id && type === "deleteItem") {
                arr.splice(i, 1);
            }
        }
        return arr;
    };
    var handleMouse = function (id) {
        setCurrentId(id);
    };
    var renderTree = function (_dataSource) {
        // let hasChildNumber = _dataSource?.filter((el) => el?.children).length;
        if (_dataSource instanceof Array) {
            return _dataSource.map(function (item, index) {
                // console.log(item,'>>>>item')
                key++;
                var rdsBgcolor = !item.isDone ? "#dc3545" : "#20c997";
                return (React.createElement("div", { style: { position: "relative" } },
                    React.createElement("div", { className: "info-wrapper", key: key },
                        false && isEditable && React.createElement("div", { className: "dot-radio bottom" },
                            React.createElement("br", null)),
                        React.createElement("div", { style: {
                                backgroundColor: item.isDone !== undefined ? rdsBgcolor : "",
                            }, className: "dot-radio" },
                            isHandle && React.createElement("div", { className: "showBtns" },
                                React.createElement(Icon, { icon: item.isContent ? "chevron-up" : "chevron-down", onClick: function (e) { return handleClick(e, item.id, index); } }),
                                React.createElement(Icon, { onClick: function (e) { return deleteCurrentItem(e, item.id, index); }, icon: "minus-circle", size: "1x" }),
                                React.createElement("div", { className: "addToBottom", onClick: function (e) { return handleAddDot(e, item.id, index, 2); } },
                                    React.createElement(Icon, { icon: "chevron-down", className: "chevron-down" }),
                                    React.createElement(Icon, { icon: "plus" })),
                                React.createElement("div", { className: "addToRight", onClick: function (e) { return handleAddDot(e, item.id, index, 1); } },
                                    React.createElement(Icon, { icon: "plus" }),
                                    React.createElement(Icon, { icon: "chevron-right", className: "chevron-right" })),
                                React.createElement("div", { key: item.id },
                                    React.createElement("input", { type: "radio", key: item.id, defaultChecked: item.isDone, onClick: function (e) {
                                            return radioChange && radioChange(e, item.id, index);
                                        } }))),
                            isExpand && clickCurrentId === item.id ? (React.createElement(Icon, { icon: "chevron-up", size: "1x", onClick: function (e) { return handleClick(e, item.id, index); } })) : isExpand && clickCurrentId !== item.id ? (React.createElement(Icon, { icon: "chevron-down", size: "1x", onClick: function (e) { return handleClick(e, item.id, index); } })) : ("")),
                        React.createElement("div", { className: "info", style: { minHeight: item.isContent ? '0px' : '130px' } },
                            React.createElement("div", { className: "title" }, whichInput === "title" && clickCurrentId === item.id ? (React.createElement(Input, { type: "text", defaultValue: typeof item.title === "string"
                                    ? item.title
                                    : ReactDOMServer.renderToString(item.title), onChange: function (e) { return changeInputValue(e, item.id, "title"); }, onBlur: function (e) {
                                    e.stopPropagation();
                                    setWhichInput("");
                                    setClickCurrentId(-1);
                                    ischangeData.length > 0 && setDate(ischangeData);
                                    ischangeData.length > 0 &&
                                        onChange &&
                                        onChange(e, item.id, ischangeData);
                                    ischangeData = [];
                                }, autoFocus: true })) : (React.createElement("div", { dangerouslySetInnerHTML: {
                                    __html: item.title ? typeof item.title === "string"
                                        ? item.title
                                        : ReactDOMServer.renderToString(item.title) :
                                        '点击输入标题(支持文字、html)'
                                }, onClick: function () {
                                    if (!isEditable)
                                        return;
                                    setClickCurrentId(item.id);
                                    setWhichInput("title");
                                } }))),
                            !item.isContent && (React.createElement("div", { className: "content" }, whichInput === "content" && clickCurrentId === item.id ? (React.createElement("textarea", { placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9\uFF0C\u652F\u6301markdown\u8BED\u6CD5\uFF0Chtml\u6807\u7B7E", style: { width: "100%", minHeight: '130px' }, defaultValue: typeof item.content === "string"
                                    ? item.content
                                    : ReactDOMServer.renderToString(item.content), onChange: function (e) {
                                    return changeInputValue(e, item.id, "content");
                                }, onBlur: function (e) {
                                    e.stopPropagation();
                                    setWhichInput("");
                                    setClickCurrentId(-1);
                                    ischangeData.length > 0 && setDate(ischangeData);
                                    ischangeData.length > 0 &&
                                        onChange &&
                                        onChange(e, item.id, ischangeData);
                                    ischangeData = [];
                                }, autoFocus: true })) : (React.createElement("div", { onClick: function (e) {
                                    if (!isEditable)
                                        return;
                                    e.stopPropagation();
                                    setClickCurrentId(item.id);
                                    setWhichInput("content");
                                } }, Util.isTestMarkDown.test(item.content) ? React.createElement(Markdown, { className: "hljs", source: item.content }) :
                                React.createElement("div", { style: { width: '100%', minHeight: 100, cursor: 'pointer' }, dangerouslySetInnerHTML: {
                                        __html: item.content ? typeof item.content === "string"
                                            ? item.content
                                            : ReactDOMServer.renderToString(item.content)
                                            : '点击输入内容，支持markdown语法、html标签'
                                    } })))))),
                        renderTree(item.children))));
            });
        }
    };
    return (React.createElement("div", __assign({ className: classes }, restProps), renderTree(_dataSource)));
};
Commission.defaultProps = {
    theme: "primary",
    isEditable: false,
    isExpand: false,
    isHandle: false,
};
export default Commission;
