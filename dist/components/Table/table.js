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
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Spin from '../Spin';
import Icon from '../Icon/icon';
import _ from 'lodash';
var tbodyTds;
var lineHeight = 50;
var Table = function (props) {
    var _a, _b, _c, _d, _e;
    var dataSource = props.dataSource, columns = props.columns, _f = props.rowSelection, rowSelection = _f === void 0 ? {} : _f, borderd = props.borderd, loading = props.loading, isTheme = props.isTheme, expandable = props.expandable, _g = props.scroll, scroll = _g === void 0 ? {} : _g, isDrag = props.isDrag, className = props.className;
    var _h = rowSelection.type, type = _h === void 0 ? "" : _h, _j = rowSelection.selectedRowKeys, selectedRowKeys = _j === void 0 ? [] : _j, onChange = rowSelection.onChange, _k = rowSelection.rowKey, rowKey = _k === void 0 ? "" : _k, _l = rowSelection.rowChoosed, rowChoosed = _l === void 0 ? false : _l;
    var expandedRowRender = expandable && expandable.expandedRowRender;
    var onExpand = (_a = expandable) === null || _a === void 0 ? void 0 : _a.onExpand;
    var rowExpandable = ((_b = expandable) === null || _b === void 0 ? void 0 : _b.rowExpandable) ? (_c = expandable) === null || _c === void 0 ? void 0 : _c.rowExpandable : function () { return true; };
    var isSingExped = (((_d = expandable) === null || _d === void 0 ? void 0 : _d.isSingExped) === undefined || ((_e = expandable) === null || _e === void 0 ? void 0 : _e.isSingExped)) ? true : false;
    var Tbody = useRef(null);
    // 数据管理
    var _m = useState(dataSource), _dataSource = _m[0], setSourceData = _m[1];
    // 设置排序
    var _o = useState(false), isAscOrder = _o[0], setOrder = _o[1];
    // 设置展开值
    var _p = useState({}), isExpend = _p[0], setIsExpend = _p[1];
    // 设置选中的key
    var _q = useState(selectedRowKeys || []), selectedKeys = _q[0], setSelectKeys = _q[1];
    // 设置拖拽起始点
    var _r = useState(0), startPoint = _r[0], setStartPoint = _r[1];
    // 设置移动的当前位置
    var _s = useState(0), currentPoint = _s[0], setCurrentPoint = _s[1];
    // 设置当前拖拽的行索引值
    var _t = useState(-1), dragIndex = _t[0], setDragIndex = _t[1];
    // 设置是否开始拖拽
    var _u = useState(false), draging = _u[0], setDraging = _u[1];
    // 初始化
    useEffect(function () {
        {
            columns.map(function (c) { return c && c.sorter instanceof Object && order(c.sorter); });
        }
    }, []);
    useEffect(function () {
        setSourceData(dataSource);
    }, [dataSource]);
    // 渲染cloumn
    var renderCloumn = function () {
        return columns.map(function (_a, idx) {
            var width = _a.width, title = _a.title, sorter = _a.sorter, key = _a.key;
            var _b, _c;
            var isT = type || expandable;
            tbodyTds = Tbody && ((_b = Tbody.current) === null || _b === void 0 ? void 0 : _b.children[0].children[0].children);
            var theadThs = tbodyTds && ((_c = tbodyTds[isT ? idx + 1 : idx]) === null || _c === void 0 ? void 0 : _c.clientWidth);
            return (
            // <th key={key} style={{ width , flexGrow:width ? 0 : 1}}>
            React.createElement("th", { key: key, style: { width: theadThs, flexGrow: width ? 0 : 1 } },
                title,
                " \u00A0",
                sorter instanceof Object ? (React.createElement("span", { onClick: function () { return order(sorter); }, style: { cursor: "pointer" } },
                    isAscOrder ?
                        React.createElement(Icon, { icon: "arrow-circle-up" }) :
                        React.createElement(Icon, { icon: "arrow-circle-down" }),
                    function () { return order(sorter); })) : ("")));
        });
    };
    // 渲染Loading
    var renderLoading = function () {
        return loading && React.createElement(Spin, { delay: 1000, loading: true });
    };
    // 排序
    function order(sorter) {
        _dataSource.sort(sorter.compare);
        if (isAscOrder) {
            setSourceData(_dataSource.slice());
            setOrder(false);
        }
        else {
            setSourceData(_dataSource.reverse().slice());
            setOrder(true);
        }
    }
    // 每一个选中时
    function onSelectChange(Keys) {
        if (selectedKeys.includes(Keys)) {
            selectedKeys.splice(selectedKeys.findIndex(function (e) { return e === Keys; }), 1);
        }
        else {
            selectedKeys.push(+Keys);
        }
        type === "checkbox"
            ? setSelectKeys(selectedKeys.slice())
            : setSelectKeys([Keys]);
        type === "checkbox"
            ? onChange && onChange(selectedKeys.slice())
            : onChange && onChange([Keys]);
    }
    // 展开行配置 必须搭配rowSelection.rowKey否则按index删除的时候会有问题
    function _onExpand(key) {
        var singExped = {};
        if (isExpend[key]) {
            isExpend[key] = false;
        }
        else {
            // 设置单一展开，还是全部可展开
            if (isSingExped) {
                singExped[key] = true;
                isExpend = singExped;
            }
            else {
                isExpend[key] = true;
            }
        }
        setIsExpend(_.cloneDeep(isExpend));
        onExpand && onExpand(key);
    }
    // 自定义render渲染
    function renderSource(c, d, didx) {
        if (typeof c.render === "function") {
            return c.render(d[c.dataIndex], d, didx);
        }
        else {
            return d[c.dataIndex];
        }
    }
    // 设置头部类型
    var renderCloumnsTitle = function () {
        return (type && (React.createElement("input", { type: type, checked: selectedKeys.length === _dataSource.length, disabled: type === "radio", onChange: function () { return checkedAll(selectedKeys); }, className: "chooselable", style: {
                visibility: type === "radio" ? 'hidden' : 'visible'
            } })));
    };
    // 设置身体头部类型
    var renderBodyTitle = function (rowKeyOrIndex) {
        return (type && (React.createElement("input", { type: type, checked: selectedKeys.includes(rowKeyOrIndex), onChange: function () { return onSelectChange(rowKeyOrIndex); }, name: "radio", id: "check+" + rowKeyOrIndex, className: "chooselable" })));
    };
    // 全部选中时
    function checkedAll(currentKeys) {
        if (currentKeys.length !== _dataSource.length) {
            var keys_1 = [];
            _dataSource.map(function (e, i) { return keys_1.push(rowKey ? +e[rowKey] : i); });
            onChange && onChange(keys_1.slice());
            setSelectKeys(keys_1.slice());
        }
        else {
            setSelectKeys([]);
            onChange && onChange([]);
        }
    }
    // 设置展开占位
    var isExpandable = function () {
        return (expandable && (React.createElement("span", { className: "expandIcon" })));
    };
    // 展开行头部信息
    var renderExpandIcon = function (rowKeyOrIndex, d) {
        return expandable && (React.createElement("span", { className: "expandIcon", onClick: function () { return rowExpandable(d) && _onExpand(rowKeyOrIndex); } }, rowExpandable(d) &&
            (isExpend[rowKeyOrIndex] ?
                React.createElement(Icon, { icon: "minus-circle", style: { margin: '0 5px' } }) :
                React.createElement(Icon, { icon: "plus-circle", style: { margin: '0 5px' } }))));
    };
    // 展开行内容部分
    var renderExpandContent = function (rowKeyOrIndex, d) {
        return (expandable &&
            expandable &&
            isExpend[rowKeyOrIndex] && (React.createElement("div", { style: { width: '100%', background: '#fbfbfb', padding: '20px 10px' } },
            React.createElement("tr", { className: "expendContent" },
                React.createElement("td", { colSpan: Number(columns.length) + 1 }, expandedRowRender && expandedRowRender(d))))));
    };
    // 设置拖拽样式
    var setdragSty = function (index) {
        console.log(currentPoint, 'currentPoint');
        if (index !== dragIndex)
            return {};
        return {
            backgroundColor: '#eee',
            opacity: '0.3',
            transform: "translate(10px," + currentPoint + "px)"
        };
    };
    // 设置拖拽开始
    var handleMouseDown = function (e, index) {
        var _a, _b;
        setDraging(true);
        setStartPoint(e.pageY);
        setDragIndex(index);
        var tbodyTrHeight = Tbody && ((_b = (_a = Tbody.current) === null || _a === void 0 ? void 0 : _a.children[index]) === null || _b === void 0 ? void 0 : _b.clientHeight);
        lineHeight = tbodyTrHeight ? tbodyTrHeight / 3 * 2 : lineHeight;
    };
    // 设置拖拽移动中
    var handleMouseMove = function (e) {
        var offset = e.pageY - startPoint;
        if (offset > lineHeight && dragIndex < _dataSource.length) { // 向下交换位置
            setSourceData(move(_dataSource, dragIndex, dragIndex + 1));
            setDragIndex(dragIndex + 1);
            setStartPoint(startPoint + lineHeight);
        }
        else if (offset < -lineHeight && dragIndex > 0) { // 向上交换位置
            setSourceData(move(_dataSource, dragIndex - 1, dragIndex));
            setDragIndex(dragIndex - 1);
            setStartPoint(startPoint - lineHeight);
        }
        setCurrentPoint(offset);
    };
    // 设置拖拽移动结束的时候
    var handleonMouseUp = function (e) {
        setDragIndex(-1);
        setDraging(false);
        setCurrentPoint(0);
        setStartPoint(0);
    };
    // 设置移动位置，交换数组值
    var move = function (list, before_index, to_index) {
        var listData = list.slice();
        listData.splice(to_index, 0, listData.splice(before_index, 1)[0]);
        return listData;
    };
    var tableclasses = classNames("table-container", className, {
        "table-borderd": borderd,
        "table-loading": loading
    });
    return (React.createElement("div", { style: { filter: isTheme }, className: "table-wrapper" },
        React.createElement("table", { className: tableclasses },
            React.createElement("thead", { className: "t_thead" },
                React.createElement("tr", { className: "t_tr" },
                    (type || expandable) && React.createElement("div", { className: "firstColomnsTitle" },
                        isExpandable(),
                        renderCloumnsTitle()),
                    renderCloumn())),
            React.createElement("div", { className: "tbody_wrapper", style: { maxHeight: scroll.y, maxWidth: scroll.x } },
                React.createElement("tbody", { className: "t_tbody", ref: Tbody }, _dataSource.map(function (d, didx) {
                    var dRowKey = +d[rowKey];
                    var rowKeyOrIndex = rowKey ? dRowKey : didx;
                    return (React.createElement(React.Fragment, null,
                        React.createElement("label", { htmlFor: rowChoosed ? "check+" + rowKeyOrIndex : "", key: d.key },
                            React.createElement("tr", { className: "t_tr", style: __assign({ 
                                    // background: isColorIndex === didx ? "#fafafa" : "",
                                    cursor: type && rowChoosed ? "pointer" : "", transition: "background .3s ease" }, setdragSty(didx)), 
                                // onMouseOver={() => getColor(didx)}
                                // onMouseOut={() => getColor(-1)}
                                onMouseDown: function (e) { isDrag && handleMouseDown(e, didx); } },
                                (type || expandable) && React.createElement("div", { className: "firstColomnsTitle" },
                                    renderExpandIcon(rowKeyOrIndex, d),
                                    renderBodyTitle(rowKeyOrIndex)),
                                columns.map(function (c) { return (React.createElement("td", { style: { width: (c && c.width), flexGrow: (c && c.width) ? 0 : 1 } }, renderSource(c, d, didx))); }))),
                        renderExpandContent(rowKeyOrIndex, d)));
                }))),
            renderLoading()),
        (isDrag && draging) &&
            React.createElement("div", { onMouseMove: function (e) { handleMouseMove(e); }, onMouseUp: function (e) { handleonMouseUp(e); }, className: "show_mask" })));
};
Table.defaultProps = {
    rowSelection: {},
    borderd: false,
    loading: false,
    isTheme: "",
    isDrag: false
};
export default Table;
