import React, { ReactElement } from "react";
export interface SubMenuProps {
    index?: string;
    title: ReactElement | string;
    className?: string;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
