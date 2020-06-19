import React from "react";
export interface TabsItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    label?: string;
}
declare const TabsItem: React.FC<TabsItemProps>;
export default TabsItem;
