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
import { useState, useEffect } from 'react';
import classnames from "classnames";
var mapTime = {
    "fast": 500,
    "middle": 1000,
    "slow": 2000
};
var clasS;
var timer;
/**
 * Animation 简单的动画组件
 * @class
 * @param isShow?: "true" | "false"
 * @param name?: "fade" | "slip"
 * @param delayTime?: "fast" | "middle" | "slow"
 * @param intDir?:"left" | "right" | "top" | "bottom"
 * @param outDir?:"left" | "right" | "top" | "bottom"
 * @extends {React.FC<AnimationProps>}
 */
var Animation = function (props) {
    var className = props.className, name = props.name, isShow = props.isShow, children = props.children, _a = props.delayTime, delayTime = _a === void 0 ? "middle" : _a, _b = props.intDir, intDir = _b === void 0 ? "" : _b, _c = props.outDir, outDir = _c === void 0 ? "" : _c, changeChild = props.changeChild;
    var _d = useState(""), classes = _d[0], setClassess = _d[1];
    var _e = useState(true), delayClear = _e[0], setDelayClear = _e[1];
    var childrenName = children.props.className;
    useEffect(function () {
        handleAnimate();
        return function () {
            setDelayClear(true);
            clearTimeout(timer);
        };
    }, [isShow, changeChild && children]);
    var handleAnimate = function () {
        var _a, _b;
        if (isShow) {
            clasS = classnames("animated", className, childrenName, (_a = {},
                _a["animate-" + name + "-" + intDir + "-in"] = name,
                _a["duration-" + delayTime + "-time"] = delayTime,
                _a));
            timer = setTimeout(function () {
                setClassess(classnames(className, childrenName));
            }, mapTime[delayTime]);
        }
        else {
            clasS = classnames("animated", childrenName, className, (_b = {},
                _b["animate-" + name + "-" + outDir + "-out"] = name,
                _b["duration-" + delayTime + "-time"] = delayTime,
                _b));
            timer = setTimeout(function () {
                setDelayClear(false);
                setClassess(classnames(className, childrenName));
            }, mapTime[delayTime]);
        }
        setClassess(clasS);
    };
    function handleAnimationEnd() {
        //  console.log('动画结束执行');
    }
    var element = __assign(__assign({}, children), { props: __assign(__assign({}, children.props), { className: classes, onAnimationEnd: handleAnimationEnd() }) });
    return delayClear && element;
};
Animation.defaultProps = {
    name: 'fade',
    isShow: true,
    delayTime: "middle",
    changeChild: false
};
export default Animation;
