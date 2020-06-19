import React, { useState, useEffect, ReactElement,useRef } from "react";
import classNames from "classnames";
import Spin from '../Spin';
import Icon from '../Icon/icon';
import _ from 'lodash'

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

interface ExpandableProps{
    /**必填，自定义展开行内容, 传入ReactElement*/ 
    expandedRowRender: (record: any) => ReactElement;
    /**展开事件的回调，返回当前行信息*/ 
    onExpand?: (record: any) => void;
    /**过滤条件, 默认全部可展开 */
    rowExpandable?: (record: any) => boolean;
    /**设置单一展开，还是全部可展开, 默认为true*/
    isSingExped?:boolean;
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
  expandable?:ExpandableProps;
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
  isDrag?:boolean;
  className?:any
}

let tbodyTds:any;
let lineHeight:number = 50;
const Table: React.FC<TableProps> = (props) => {
  const {
    dataSource,
    columns,
    rowSelection = {},
    borderd,
    loading,
    isTheme,
    expandable,
    scroll = {},
    isDrag,
    className
  } = props;
  const {
    type = "",
    selectedRowKeys = [],
    onChange,
    rowKey = "",
    rowChoosed = false,
  } = rowSelection;
  const expandedRowRender = expandable&&expandable.expandedRowRender;
  const onExpand = expandable?.onExpand
  const rowExpandable = expandable?.rowExpandable ? expandable?.rowExpandable: ()=>true;
  const isSingExped = (expandable?.isSingExped === undefined || expandable?.isSingExped) ? true : false;


  const Tbody = useRef<HTMLTableSectionElement>(null)

  // 数据管理
  const [_dataSource, setSourceData] = useState(dataSource);
  // 设置排序
  const [isAscOrder, setOrder] = useState(false);
  // 设置展开值
  let [isExpend, setIsExpend] = useState<any>({});
  // 设置选中的key
  const [selectedKeys, setSelectKeys] = useState(selectedRowKeys || []);
  // 设置拖拽起始点
  const [startPoint,setStartPoint] = useState<number>(0);
  // 设置移动的当前位置
  const [currentPoint,setCurrentPoint] = useState<number>(0);
  // 设置当前拖拽的行索引值
  const [dragIndex,setDragIndex] = useState<number>(-1);
  // 设置是否开始拖拽
  const [draging,setDraging] = useState<boolean>(false)
   

  // 初始化
  useEffect(() => {
    {
      columns.map((c) => c && c.sorter instanceof Object && order(c.sorter));
    }
  }, []);

  useEffect(() => {
    setSourceData(dataSource);
  }, [dataSource]);

  // 渲染cloumn
  const renderCloumn = () => {
    return columns.map(({ width, title, sorter, key },idx) => {
      let isT = type||expandable;
      tbodyTds = Tbody&&Tbody.current?.children[0].children[0].children;
      let theadThs = tbodyTds&&tbodyTds[isT?idx+1:idx]?.clientWidth;
      return (
        // <th key={key} style={{ width , flexGrow:width ? 0 : 1}}>
        <th key={key} style={{ width:theadThs , flexGrow:width ? 0 : 1}}>
          {title} &nbsp;
          {sorter instanceof Object ? (
            <span onClick={() => order(sorter)} style={{ cursor: "pointer" }}>
              {isAscOrder ? 
                <Icon icon="arrow-circle-up"/>:
                <Icon icon="arrow-circle-down"/>
              }
              {() => order(sorter)}
            </span>
          ) : (
            ""
          )}
        </th>
      );
    });
  };

  // 渲染Loading
  const renderLoading = () => {
    return loading && <Spin delay={1000} loading/>;
  };

  // 排序
  function order(sorter: {
    compare: ((a: any, b: any) => number) | undefined;
  }) {
    _dataSource.sort(sorter.compare);
    if (isAscOrder) {
      setSourceData(_dataSource.slice());
      setOrder(false);
    } else {
      setSourceData(_dataSource.reverse().slice());
      setOrder(true);
    }
  }

  // 每一个选中时
  function onSelectChange(Keys: number) {
    if (selectedKeys.includes(Keys)) {
      selectedKeys.splice(
        selectedKeys.findIndex((e) => e === Keys),
        1
      );
    } else {
      selectedKeys.push(+Keys);
    }
    type === "checkbox"
      ? setSelectKeys(selectedKeys.slice())
      : setSelectKeys([Keys]);
    type === "checkbox"
      ? onChange && onChange(selectedKeys.slice())
      : onChange && onChange([Keys]);
  }

  // 展开行配置 必须搭配rowSelection.rowKey否则按index删除的时候会有问题
  function _onExpand(key: number) {
    let singExped:any = {}
    if (isExpend[key]) {
      isExpend[key] = false;
    } else{
      // 设置单一展开，还是全部可展开
       if(isSingExped){
        singExped[key] = true 
        isExpend = singExped
       }else{
        isExpend[key] = true;
       }
    }
    setIsExpend(_.cloneDeep(isExpend));
    onExpand&&onExpand(key);
  }

  // 自定义render渲染
  function renderSource(
    c: {
      render: (arg0: any, arg1: any, arg2: any) => any;
      dataIndex: string | number;
    },
    d: { [x: string]: any },
    didx: number
  ) {
    if (typeof c.render === "function") {
      return c.render(d[c.dataIndex], d, didx);
    } else {
      return d[c.dataIndex];
    }
  }

  // 设置头部类型
  const renderCloumnsTitle = () => {
    return (
      type && (
        <input
          type={type}
          checked={selectedKeys.length === _dataSource.length}
          disabled={type === "radio"}
          onChange={() => checkedAll(selectedKeys)}
          className="chooselable"
          style={{
            visibility: type === "radio" ? 'hidden' : 'visible'
          }}
        />
      )
    );
  };
 
  // 设置身体头部类型
  const renderBodyTitle = (rowKeyOrIndex: number) => {
    return (
      type && (
        <input
          type={type}
          checked={selectedKeys.includes(rowKeyOrIndex)}
          onChange={() => onSelectChange(rowKeyOrIndex)}
          name="radio"
          id={`check+${rowKeyOrIndex}`}
          className="chooselable"
        />
      )
    );
  };

   // 全部选中时
   function checkedAll(currentKeys: string | any[]) {
    if (currentKeys.length !== _dataSource.length) {
      let keys: number[] = [];
      _dataSource.map((e, i) => keys.push(rowKey ? +e[rowKey] : i));
      onChange && onChange(keys.slice());
      setSelectKeys(keys.slice());
    } else {
      setSelectKeys([]);
      onChange && onChange([]);
    }
  }

  // 设置展开占位
  const isExpandable = () => {
    return (
      expandable && (
        <span className="expandIcon">
        </span>
      )
    );
  };

  // 展开行头部信息
 const renderExpandIcon =(rowKeyOrIndex: number,d: any)=>{
  return expandable && (
    <span 
      className="expandIcon"
      onClick={() => rowExpandable(d) && _onExpand(rowKeyOrIndex)}
    >
     {rowExpandable(d) &&
        (isExpend[rowKeyOrIndex] ?
           <Icon icon="minus-circle" style={{margin:'0 5px'}}/>:
           <Icon icon="plus-circle" style={{margin:'0 5px'}}/>
           )
      }
    </span>
  )
 }

 // 展开行内容部分
  const renderExpandContent = (rowKeyOrIndex: number, d: any) => {
    return (
      expandable &&
      expandable && 
      isExpend[rowKeyOrIndex] && (
        <div style={{width:'100%',background: '#fbfbfb',padding:'20px 10px'}}>
        <tr className="expendContent">
          <td colSpan={Number(columns.length) + 1}>
                {expandedRowRender&&expandedRowRender(d)}
          </td>
        </tr>
        </div>
      )
    );
  };

 // 设置拖拽样式
 const setdragSty = (index:number) => {
   console.log(currentPoint,'currentPoint')
   if(index!==dragIndex)return {}
   return {
     backgroundColor:'#eee',
     opacity:'0.3',
     transform:`translate(10px,${currentPoint}px)`
   }
 }

 // 设置拖拽开始
const handleMouseDown =(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,index: number)=>{
    setDraging(true);
    setStartPoint(e.pageY)
    setDragIndex(index)
    let tbodyTrHeight = Tbody&&Tbody.current?.children[index]?.clientHeight;
    lineHeight = tbodyTrHeight?tbodyTrHeight/3*2:lineHeight
 }

 // 设置拖拽移动中
 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
     let offset = e.pageY - startPoint;
     if(offset>lineHeight&&dragIndex<_dataSource.length){  // 向下交换位置
         setSourceData(move(_dataSource,dragIndex,dragIndex+1))
         setDragIndex(dragIndex+1)
         setStartPoint(startPoint+lineHeight)
     }else if(offset<-lineHeight&&dragIndex>0){            // 向上交换位置
      setSourceData(move(_dataSource,dragIndex-1,dragIndex))
      setDragIndex(dragIndex-1)
      setStartPoint(startPoint-lineHeight)
     }
     setCurrentPoint(offset)
 }

 // 设置拖拽移动结束的时候
 const handleonMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    setDragIndex(-1)
    setDraging(false)
    setCurrentPoint(0)
    setStartPoint(0)
 }

 // 设置移动位置，交换数组值
 const move = (list: any[],before_index: number,to_index: number)=>{
     let listData = list.slice();
     listData.splice(to_index,0,listData.splice(before_index,1)[0])
     return listData
 }

  const tableclasses = classNames("table-container", className, {
    "table-borderd": borderd,
    "table-loading": loading
  });

  return (
    <div style={{filter: isTheme}} className="table-wrapper">
      <table className={tableclasses}>
        <thead className ="t_thead">
          <tr className="t_tr">
          {( type||expandable )&&<div className="firstColomnsTitle">
            {/* 设置有展开占位 */}
            {isExpandable()}
            {/* 设置头部类型type */}
            {renderCloumnsTitle()}
            </div>
           }
            {/* 设置table的columns */}
            {renderCloumn()}
          </tr>
        </thead>
        <div className="tbody_wrapper" style={{ maxHeight: scroll.y, maxWidth: scroll.x}}>
          <tbody className="t_tbody" ref={Tbody}>
            {_dataSource.map((d, didx) => {
              const dRowKey = +d[rowKey];
              const rowKeyOrIndex = rowKey ? dRowKey : didx;
              return (
                <>
                  <label
                    htmlFor={rowChoosed ? `check+${rowKeyOrIndex}` : ""}
                    key={d.key}
                  >
                    <tr
                      className="t_tr"
                      style={{
                        // background: isColorIndex === didx ? "#fafafa" : "",
                        cursor: type&& rowChoosed ? "pointer" : "",
                        transition: "background .3s ease",
                        ...setdragSty(didx)
                      }}
                      // onMouseOver={() => getColor(didx)}
                      // onMouseOut={() => getColor(-1)}
                      onMouseDown={(e)=>{isDrag && handleMouseDown(e,didx)}}
                    >

                    {( type||expandable )&& <div className="firstColomnsTitle">
                        {/* 展开行图标，过滤条件展开 */}
                        {renderExpandIcon(rowKeyOrIndex,d)}
                        {/* 设置表格头部类型 */}
                        {renderBodyTitle(rowKeyOrIndex)}
                      </div>
                   }
                      
                      {columns.map((c) => (
                          <td style={{ width: (c && c.width) , flexGrow:(c && c.width) ? 0 : 1 }}>
                              {renderSource(c, d, didx)}
                          </td>
                      ))}
                    </tr>
                  </label>
                  {/* 设置展开行的内容 */}
                  {renderExpandContent(rowKeyOrIndex, d)}
                </>
              );
            })}
               
          </tbody>
        </div>
        {/* Loading */}
        {renderLoading()}
      </table>
      {(isDrag&&draging)&&
        <div
          onMouseMove={(e)=>{handleMouseMove(e)}}
          onMouseUp={(e)=>{handleonMouseUp(e)}}
          className="show_mask"
        >
        </div>}
   
    </div>
  );
};

Table.defaultProps = {
  rowSelection: {},
  borderd: false,
  loading: false,
  isTheme: "",
  isDrag:false
};
export default Table;
