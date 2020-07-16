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
import React, { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
// import Transition from '../Transition/transition'
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from '../../hooks/useClickOutside';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var tirrgerSearch = useRef(false); // 作为一个js对象用, 不用更新组件
    var comRef = useRef(null); // 作为获取dom节点使用
    var debounceValue = useDebounce(inputValue, 500);
    // 点击外面关闭下拉框
    useClickOutside(comRef, function () { setSuggestions([]); setHighlightIndex(-1); });
    useEffect(function () {
        if (debounceValue && tirrgerSearch.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [debounceValue, fetchSuggestions]);
    // 选择高亮
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        tirrgerSearch.current = true;
        switch (e.keyCode) {
            case 13: // 选中
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // 上
                highlight(highlightIndex - 1);
                break;
            case 40: // 下
                highlight(highlightIndex + 1);
                break;
            case 27: // esc
                // setShowDropdown(false)
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        if (suggestions.length === 0) {
            setHighlightIndex(-1);
        }
    };
    var handleSelect = function (item) {
        tirrgerSearch.current = false;
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect)
            onSelect(item);
        setHighlightIndex(-1);
    };
    var handleTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", { className: "rock-suggestion-list" }, suggestions.map(function (item, index) {
            console.log(highlightIndex, 'highlightIndex');
            var cnames = classNames("suggestion-item", {
                "is-active": index === highlightIndex,
            });
            return (React.createElement("li", { key: index, onClick: function () { return handleSelect(item); }, className: cnames }, handleTemplate(item)));
        })));
    };
    return (React.createElement("div", { ref: comRef, className: "rock-auto-complete" },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        loading && (React.createElement("ul", null,
            React.createElement(Icon, { icon: "spinner", spin: true }))),
        suggestions.length > 0 && generateDropdown()));
};
export default AutoComplete;
