import React from "react";
declare type SelectCallback = (selectedIndex: number) => void;
export interface TabsProps {
    defaultIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}
interface ITabsContext {
    index: number;
    onSelect?: SelectCallback;
}
export declare const TabsContext: React.Context<ITabsContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
