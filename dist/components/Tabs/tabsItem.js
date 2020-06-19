import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from './tabs';
import Animation from '../Animation';
var TabsItem = function (props) {
    var index = props.index, className = props.className, disabled = props.disabled, style = props.style, children = props.children, label = props.label;
    var context = useContext(TabsContext);
    var classes = classNames("tabs-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("div", { className: "tab-item-wrapper" },
        React.createElement("li", { className: classes, style: style, onClick: handleClick }, label),
        React.createElement(Animation, { changeChild: true, name: "fade" },
            React.createElement("div", { style: { display: context.index === index ? 'block' : 'none' } }, children))));
};
TabsItem.defaultProps = {
    index: 0,
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
