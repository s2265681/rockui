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
import React, { useEffect } from 'react';
import classNames from "classnames";
function getStarts(num) {
    if (num === void 0) { num = 100; }
    var doms = "", randomSize, randomLeft, randomTop, opacity, animation;
    for (var i = 0; i < num; i++) {
        randomTop = Math.floor(Math.random() * 100) + '%';
        randomLeft = Math.floor(Math.random() * 100) + '%';
        randomSize = Math.floor(Math.random() * 10) + 'px';
        opacity = Math.random() * 10;
        animation = "aniStart " + (Math.random() * 10 + 3) + "s ease-in-out infinite";
        doms += "\n           <div \n               class=\"startSty heart\"\n               style=\"\n               top:" + randomTop + ";\n               left:" + randomLeft + ";\n               width:" + randomSize + ";\n               height:" + randomSize + ";\n               animation:" + animation + ";\n               opacity:" + opacity + "\"\n            >\n           </div>\n        ";
    }
    return doms;
}
var StartSpace = function (props) {
    var _a;
    var animationType = props.animationType, className = props.className, restProps = __rest(props, ["animationType", "className"]);
    var classess = classNames('start_wrapper', className, (_a = {},
        _a["turn-" + animationType] = animationType,
        _a));
    console.log(restProps, 'restProps');
    console.log(classess, 'classess');
    useEffect(function () {
        var start = document.getElementById('start');
        if (start) {
            start.classList.add("start_wrapper_comeIn-" + animationType);
            start.innerHTML = getStarts(100);
        }
    }, []);
    return (React.createElement("div", __assign({ className: classess, id: "start" }, restProps)));
};
export default StartSpace;
