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
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基本的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'rockui'
 * ~~~
 * 支持 HTNLInput 的所有基本属性
 */
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, addonBefore = props.addonBefore, addonAfter = props.addonAfter, className = props.className, style = props.style, restProps = __rest(props
    // classes
    , ["disabled", "size", "icon", "addonBefore", "addonAfter", "className", "style"]);
    // classes
    var classess = classNames("rock-input-wrapper", className, (_a = {
            'is-disabled': disabled
        },
        _a["input-size-" + size] = size,
        _a['input-group'] = addonBefore || addonAfter,
        _a['input-group-addonBefore'] = addonBefore,
        _a['input-group-addonAfter'] = addonAfter,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === "undefined" || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) { // 'name' in {name:'12'} true
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: classess, style: style },
        addonBefore && React.createElement("div", { className: "rock-input-group-addonBefore" }, addonBefore),
        icon && React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: "title-" + icon })),
        React.createElement("input", __assign({ className: "rock-input-inner", disabled: disabled }, restProps)),
        addonAfter && React.createElement("div", { className: "rock-input-group-addonAfter" }, addonAfter)));
};
Input.defaultProps = {
    disabled: false
};
export default Input;
