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
import React, { useState, useEffect } from "react";
import Mask from "../Mask";
var HandleBlock = function (props) {
    var onChange = props.onChange, blockInfo = props.blockInfo;
    var _a = useState(blockInfo ||
        {
            width: 200, height: 200,
            pointX: 300, pointY: 100
        }), block = _a[0], setBlock = _a[1];
    var _b = useState(false), isdragging = _b[0], setIsdraging = _b[1];
    var _c = useState("move"), moveOrScale = _c[0], setMoveOrScale = _c[1];
    var _d = useState({ startX: 0, startY: 0 }), scalePoint = _d[0], setScalePoint = _d[1];
    var _e = useState('right'), scaleDir = _e[0], setScaleDir = _e[1];
    useEffect(function () {
        localStorage.setItem('block-demo', JSON.stringify(block));
        onChange && onChange(block);
    }, [block, onChange]);
    // 移动鼠标按下
    var handleMoveDown = function (e) {
        var _a, _b;
        setIsdraging(true);
        setMoveOrScale("move");
        var startX = e.pageX;
        var startY = e.pageY;
        var handle_box = document.querySelector("#handle_box");
        var width = (_a = handle_box) === null || _a === void 0 ? void 0 : _a.clientWidth;
        var height = (_b = handle_box) === null || _b === void 0 ? void 0 : _b.clientHeight;
        setBlock(__assign(__assign({}, block), { pointX: startX - width / 2, pointY: startY - height / 2 }));
    };
    // 缩放鼠标按下
    var handleScaleEnter = function (e, dir) {
        e.stopPropagation();
        setIsdraging(true);
        setMoveOrScale('scale');
        setScaleDir(dir);
        setScalePoint({ startX: e.pageX - block.width, startY: e.pageY - block.height });
    };
    // 移动或者缩放鼠标拖动
    var handleMove = function (e) {
        var _a, _b;
        var startX = e.pageX;
        var startY = e.pageY;
        if (moveOrScale === 'move') {
            var handle_box = document.querySelector("#handle_box");
            var width = (_a = handle_box) === null || _a === void 0 ? void 0 : _a.clientWidth;
            var height = (_b = handle_box) === null || _b === void 0 ? void 0 : _b.clientHeight;
            setBlock(__assign(__assign({}, block), { pointX: startX - width / 2, pointY: startY - height / 2 }));
        }
        else if (moveOrScale === 'scale') {
            var offsetX = e.pageX - scalePoint.startX;
            var offsetY = e.pageY - scalePoint.startY;
            var width = offsetX;
            var height = offsetY;
            scaleDir === 'right' && setBlock(__assign(__assign({}, block), { width: width }));
            scaleDir === 'bottom' && setBlock(__assign(__assign({}, block), { height: height }));
            scaleDir === 'left-bottom' && setBlock(__assign(__assign({}, block), { width: width, height: height }));
        }
    };
    // 移动或者缩放鼠标抬起
    var handleMoveUp = function (e) {
        setIsdraging(false);
        setMoveOrScale("move");
        setScaleDir('right');
    };
    return (React.createElement("div", { className: "handle_box_wrapper" },
        React.createElement("div", { className: "box", style: {
                left: block.pointX,
                top: block.pointY,
                width: block.width,
                height: block.height,
            }, onMouseDown: function (e) { return handleMoveDown(e); }, id: "handle_box" },
            React.createElement("div", { className: "move-right", onMouseDown: function (e) { return handleScaleEnter(e, 'right'); }, style: { height: block.height } }, "||"),
            React.createElement("div", { className: "move-bottom", onMouseDown: function (e) { return handleScaleEnter(e, 'bottom'); }, style: { width: block.width } }, "="),
            React.createElement("div", { className: "move-right-bottom", onMouseDown: function (e) { return handleScaleEnter(e, 'left-bottom'); } }, "*")),
        React.createElement(Mask, { visible: isdragging, onMouseMove: handleMove, onMouseUp: handleMoveUp })));
};
export default HandleBlock;
