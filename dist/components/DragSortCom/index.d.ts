import React from "react";
import "./index.css";
interface IProps {
    Data: any[];
    index: number;
    lineHeight: number;
    setList: (list: any[]) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
declare const DragSortCom: React.FC<IProps>;
export default DragSortCom;
