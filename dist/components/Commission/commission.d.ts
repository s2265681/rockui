import React from "react";
import 'highlight.js/styles/solarized-light.css';
interface dataProps {
    /**id为唯一标示，必须为唯一值 */
    id: number;
    /**title标题文字*/
    title: string | React.ReactElement | undefined;
    /**内容部分*/
    content?: string | React.ReactElement | undefined;
    /**下一级的内容*/
    children?: Array<dataProps>;
}
interface CommissionProps {
    className?: string;
    /**传入树状数据结构，必填 */
    dataSource: Array<dataProps> | never[];
    /**设置主题颜色 */
    theme?: "primary" | "info" | "warning" | "danger";
    /**设置是否具有操作功能 */
    isHandle?: boolean;
    /**设置是否具有展开收起功能*/
    isExpand?: boolean;
    /**设置是否具有可编辑功能 */
    isEditable?: boolean;
    /**操作节点后的事件，将返回当前数据和操作后的结构\
     * e,itemId,newDate
     */
    onChange?: (e: React.MouseEvent, itemId: number, newDate: Array<dataProps> & never[]) => void;
}
/**
 *
 * @param props  dataSource | theme | isHandle | isExpand | isEditable
 */
declare const Commission: React.FC<CommissionProps>;
export default Commission;
