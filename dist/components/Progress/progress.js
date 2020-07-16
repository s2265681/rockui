import React from 'react';
var Progress = function (props) {
    var percent = props.percent, showText = props.showText, strokeHeight = props.strokeHeight, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "rock-progress-bar", style: styles },
        React.createElement("div", { className: "rock-progress-bar-outer", style: { height: strokeHeight } },
            React.createElement("div", { className: "rock-progress-bar-inner \n                     color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" },
                percent,
                "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
