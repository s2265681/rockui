import React, { useState } from "react";
import Mask from "../Mask";
var DragSortCom = function (props) {
    var List = props.Data, index = props.index, setList = props.setList, lineHeight = props.lineHeight, children = props.children, onMouseUp = props.onMouseUp;
    var _a = useState(false), draging = _a[0], setDrag = _a[1];
    var _b = useState(0), startPageY = _b[0], setStartPageY = _b[1];
    var _c = useState(0), offsetPageY = _c[0], setOffsetPageY = _c[1];
    var _d = useState(-1), draggingIndex = _d[0], setDraggingIndex = _d[1];
    function handleMouseDown(evt, index) {
        // evt.stopPropagation();// 不能阻止冒泡
        setDraggingIndex(index);
        setStartPageY(evt.pageY);
        setDrag(true);
    }
    function getLiStyle(index) {
        if (index !== draggingIndex)
            return {};
        return {
            transform: "translate(5px," + offsetPageY + "px)",
        };
    }
    function handleMouseMove(e) {
        var offset = e.pageY - startPageY;
        if (offset > lineHeight && draggingIndex < List.length) {
            offset -= lineHeight;
            var newList = move(List, draggingIndex, draggingIndex + 1);
            setList(newList);
            setDraggingIndex(draggingIndex + 1);
            setStartPageY(startPageY + lineHeight);
        }
        else if (offset < -lineHeight && draggingIndex > 0) {
            offset += lineHeight;
            var newList = move(List, draggingIndex - 1, draggingIndex);
            setList(newList);
            setDraggingIndex(draggingIndex - 1);
            setStartPageY(startPageY - lineHeight);
        }
        setOffsetPageY(offset);
    }
    function move(arr, startIndex, toIndex) {
        console.log(arr, startIndex, toIndex);
        arr = arr.slice();
        arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
        return arr;
    }
    function handleMouseUp(e) {
        setDrag(false);
        setStartPageY(0);
        setDraggingIndex(-1);
        onMouseUp && onMouseUp(e);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onMouseDown: function (evt) { return handleMouseDown(evt, index); }, key: index, style: getLiStyle(index), className: "mask-li-style " + (index == draggingIndex ? " chooseSty" : "") }, children),
        React.createElement(Mask, { visible: draging, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp })));
};
export default DragSortCom;
