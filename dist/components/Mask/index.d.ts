import React, { FunctionComponent } from "react";
interface Props {
    visible: boolean;
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
declare const Mask: FunctionComponent<Props>;
export default Mask;
