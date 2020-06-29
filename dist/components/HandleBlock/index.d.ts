import React from "react";
import './index.css';
declare type blockObj = {
    width: number;
    height: number;
    pointX: number;
    pointY: number;
};
interface Props {
    blockInfo?: blockObj;
    onChange?: (info: blockObj) => void;
}
declare const HandleBlock: React.FC<Props>;
export default HandleBlock;
