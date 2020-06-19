import React, { ReactElement } from "react";
interface RowSelection {
    /** 设置选中类型 */
    type?: "radio" | "checkbox" | "";
    /** 设置要选中的行key或者index */
    selectedRowKeys?: Array<any>;
    /** 设置onChange回调 */
    onChange?: (key: any) => void;
    /** 设置没行的key */
    rowKey?: string;
    /** 设置是否点击行选中，默认false */
    rowChoosed?: boolean;
}
interface ExpandableProps {
    /**必填，自定义展开行内容, 传入ReactElement*/
    expandedRowRender: (record: any) => ReactElement;
    /**展开事件的回调，返回当前行信息*/
    onExpand?: (record: any) => void;
    /**过滤条件, 默认全部可展开 */
    rowExpandable?: (record: any) => boolean;
    /**设置单一展开，还是全部可展开, 默认为true*/
    isSingExped?: boolean;
}
interface TableProps {
    /**
     * 数据源必填\
     * 对象的key必须与columns的dataIndex对应
     */
    dataSource: Array<any>;
    /**
     * colunms必填\
     * key:""\
     * dataIndex:""\
     * title:""\
     *  sorter: {
     *    compare: (a: { age: number }, b: { age: number }) => a.age - b.age
     *  }\
     * render(text,record,index)=>console.log(text,record,index)
     */
    columns: Array<any>;
    /**
     * 设置选中行状态\
     * 参数为\
     *type?: "radio" | "checkbox" | ""\
     *设置选中类型\
     *selectedRowKeys?: Array<any>;\
     * 设置要选中的行key或者index\
     *onChange?: (key: any) => void;\
     *设置onChange回调\
     *rowKey?: string;\
     *设置没行的key\
     *rowChoosed?: boolean;\
     *eg:\
     *rowSelection={{...}}
     */
    rowSelection?: RowSelection;
    /**设置Table的边框，默认无边框 */
    borderd?: boolean;
    /**
     * 设置loading状态，默认false
     */
    loading?: boolean;
    /**
     *  设置过滤\
     *  可选filter中的值：如：grayscale(100%)、opacity(0.8)、sepia(0.6)\
     *  参考:https://www.runoob.com/cssref/css3-pr-filter.html
     */
    isTheme?: string;
    /**可展开配置，参数以对象形式传入\
     * expandedRowRender: (record: any) => ReactElement;\
     * 必填，自定义展开行内容, 传入ReactElement \
     *onExpand?: (record: any) => void;\
     *展开事件的回调，返回当前行信息\
     *rowExpandable?: (record: any) => boolean;\
     *过滤条件, 默认全部可展开\
     *isSingExped?:boolean;\
     *设置单一展开，还是全部可展开, 默认为true\
     *eg:\
     *expandable={{...}}
    */
    expandable?: ExpandableProps;
    /**
     * 窗口设置滚动，设置y轴的高度后表格高度超出变为滚动\
     * 暂不支持x轴方向的滚动\
     * eg: scroll={{ y: 200 }}
     */
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    /** 是否设置拖拽 */
    isDrag?: boolean;
    className?: any;
}
declare const Table: React.FC<TableProps>;
export default Table;
