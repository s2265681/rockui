import React from 'react';
var Spin = function (props) {
    var loading = props.loading;
    if (loading) {
        return (React.createElement("div", { className: "spin_wrapper" },
            React.createElement("p", { className: "click_block" })));
    }
    return React.createElement(React.Fragment, null);
};
export default Spin;
