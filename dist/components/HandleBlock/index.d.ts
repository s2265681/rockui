import React from "react";
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
