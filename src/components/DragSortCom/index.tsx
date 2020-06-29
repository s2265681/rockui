import React, { useState } from "react";
import Mask from "../Mask";
import "./index.css";

interface IProps {
  Data: any[];
  index: number;
  lineHeight: number;
  setList: (list: any[]) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DragSortCom: React.FC<IProps> = (props) => {
  const { Data: List, index, setList, lineHeight, children,onMouseUp } = props;

  const [draging, setDrag] = useState(false);
  const [startPageY, setStartPageY] = useState(0);
  const [offsetPageY, setOffsetPageY] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState(-1);

  function handleMouseDown(
    evt: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) {
    // evt.stopPropagation();// 不能阻止冒泡
    setDraggingIndex(index);
    setStartPageY(evt.pageY);
    setDrag(true);
  }

  function getLiStyle(index: number) {
    if (index !== draggingIndex) return {};
    return {
      transform: `translate(5px,${offsetPageY}px)`,
    };
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let offset = e.pageY - startPageY;
    if (offset > lineHeight && draggingIndex < List.length) {
      offset -= lineHeight;
      let newList = move(List, draggingIndex, draggingIndex + 1);
      setList(newList);
      setDraggingIndex(draggingIndex + 1);
      setStartPageY(startPageY + lineHeight);
    } else if (offset < -lineHeight && draggingIndex > 0) {
      offset += lineHeight;
      let newList = move(List, draggingIndex - 1, draggingIndex);
      setList(newList);
      setDraggingIndex(draggingIndex - 1);
      setStartPageY(startPageY - lineHeight);
    }
    setOffsetPageY(offset);
  }

  function move(
    arr: { id: number; title: string; content: string }[],
    startIndex: number,
    toIndex: number
  ) {
    console.log(arr, startIndex, toIndex);
    arr = arr.slice();
    arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
    return arr;
  }

  function handleMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setDrag(false);
    setStartPageY(0);
    setDraggingIndex(-1);
    onMouseUp&&onMouseUp(e)
  }

  return (
    <>
      <div
        onMouseDown={(evt) => handleMouseDown(evt, index)}
        key={index}
        style={getLiStyle(index)}
        className={`mask-li-style ${
          index == draggingIndex ? " chooseSty" : ""
        }`}
      >
        {children}
      </div>
      <Mask
        visible={draging}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

export default DragSortCom;
