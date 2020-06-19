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
import React, { useState, useEffect } from 'react';
import { isNumber } from 'util';
import Icon from '../../components/Icon/icon';
import Animation from '../../components/Animation';
var timer;
var Spider = function (props) {
    var children = props.children, initIdx = props.initIdx, height = props.height, autoplay = props.autoplay, deployTime = props.deployTime, restProps = __rest(props, ["children", "initIdx", "height", "autoplay", "deployTime"]);
    var len = children.length;
    var _a = useState(initIdx), currentIdx = _a[0], setCurrentIdx = _a[1];
    var _b = useState(children[0]), child = _b[0], setChild = _b[1];
    var _c = useState('left'), dir = _c[0], setDir = _c[1];
    useEffect(function () {
        autoplay && run(initIdx);
        console.log('change');
        return function () {
            stop();
        };
    }, [autoplay, currentIdx]);
    // run 开始
    function run(curIdx) {
        var newIdx = curIdx;
        timer = setInterval(function () {
            if (newIdx === len)
                newIdx = 0;
            setChild(children[newIdx]);
            setCurrentIdx(newIdx);
            newIdx++;
        }, deployTime);
    }
    // stop
    function stop() {
        clearInterval(timer);
        timer = null;
    }
    function TurnLeft(dir) {
        stop();
        setDir(dir);
        if (dir === "left") {
            if (currentIdx === 0)
                currentIdx = len;
            if (isNumber(currentIdx))
                --currentIdx;
        }
        else if (dir === "right") {
            if (currentIdx === len - 1)
                currentIdx = -1;
            if (isNumber(currentIdx))
                ++currentIdx;
        }
        setCurrentIdx(currentIdx);
        setChild(children[currentIdx || 0]);
        autoplay && run(currentIdx);
    }
    // chooseIdx
    function chooseIdx(i) {
        stop();
        setCurrentIdx(i);
        setChild(children[i]);
        autoplay && run(i);
    }
    return (React.createElement("div", __assign({ className: "spider-container" }, restProps),
        React.createElement("div", { className: "spider", style: { height: height } },
            React.createElement(Animation, { changeChild: true, name: "fade", intDir: dir === 'left' ? 'right' : 'left' }, child)),
        React.createElement("div", { className: "dot" }, children.map(function (e, i) { return (React.createElement("button", { key: i, onClick: function () { return chooseIdx(i); }, style: { background: i === currentIdx ? "#f00" : "" } }, i === currentIdx && React.createElement("div", null))); })),
        React.createElement("div", { className: "arow" },
            React.createElement("a", { href: "javascript:;", onClick: function () { return TurnLeft("left"); } },
                React.createElement(Icon, { icon: "arrow-circle-left", size: "2x" })),
            React.createElement("a", { href: "javascript:;", onClick: function () { return TurnLeft("right"); } },
                React.createElement(Icon, { icon: "arrow-circle-right", size: "2x" })))));
};
Spider.defaultProps = {
    autoplay: true,
    deployTime: 1000,
    initIdx: 0,
    height: 300
};
export default Spider;
