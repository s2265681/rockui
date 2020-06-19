import React, { createContext, useState } from "react";
import classNames from "classnames";
export var TabsContext = createContext({ index: 0 });
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, style = props.style, children = props.children, onSelect = props.onSelect;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('tabs', className);
    var handleClick = function (index) {
        setActive(index);
        if (onSelect)
            onSelect(index);
    };
    var passedContext = {
        index: currentActive || 0,
        onSelect: handleClick,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childrenElement = child;
            return React.cloneElement(childrenElement, { index: index });
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-tabs" },
        React.createElement(TabsContext.Provider, { value: passedContext }, renderChildren())));
};
export default Tabs;
