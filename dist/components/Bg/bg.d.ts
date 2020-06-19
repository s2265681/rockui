import React from "react";
declare type animationType = '' | 'down' | 'left';
interface BgProps {
    className?: string;
    animationType?: animationType;
    type?: 'start';
    style?: any;
}
declare const Bg: React.FC<BgProps>;
export default Bg;
