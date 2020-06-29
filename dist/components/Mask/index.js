import React from "react";
var Mask = function (props) {
    var visible = props.visible, onMouseMove = props.onMouseMove, onMouseUp = props.onMouseUp;
    if (!visible)
        return React.createElement(React.Fragment, null);
    return (React.createElement("div", { className: "show_mask", onMouseMove: onMouseMove, onMouseUp: onMouseUp }));
};
export default Mask;
