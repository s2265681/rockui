import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Input from "../Input";
import _ from "lodash";
import ReactDOMServer from "react-dom/server";
import Markdown from 'react-markdown/with-html'
import 'highlight.js/styles/solarized-light.css'
import Util from './util'

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
  onChange?: (
    e: React.MouseEvent,
    itemId: number,
    newDate: Array<dataProps> & never[]
  ) => void;
}

let key: number = 0;
let ischangeData: any = [];
let findMaxArr: number[] = [];
/**
 *
 * @param props  dataSource | theme | isHandle | isExpand | isEditable
 */
const Commission: React.FC<CommissionProps> = (props) => {
  const {
    className,
    theme,
    dataSource,
    isHandle,
    onChange,
    isExpand,
    isEditable,
    ...restProps
  } = props;
  const [_dataSource, setDate] = useState(dataSource);
  const [currentId, setCurrentId] = useState<number>();
  const [clickCurrentId, setClickCurrentId] = useState<number>();
  const [whichInput, setWhichInput] = useState<string>("");

  // 传入更新的date的时候
  useEffect(() => {
    setDate(_dataSource.slice());
    findAllId(_dataSource)
  }, [dataSource]);

  const classes = classNames("commission", className, {
    [`commission-${theme}`]: theme,
  });
  // 更改代办事项状态
  const radioChange = (
    e: React.MouseEvent<Element, MouseEvent>,
    itemId: number,
    index: number
  ) => {
    // 阻止事件冒泡
    e.stopPropagation();
    const _newData = changeEveryVal(
      itemId,
      _.cloneDeep(_dataSource),
      "RadioChange"
    );
    onChange && onChange(e, itemId, _newData);
    setDate(_newData);
  };
  // 删除代办项
  const deleteCurrentItem = (
    e: React.MouseEvent<Element, MouseEvent>,
    itemId: number,
    index: number
  ) => {
    // 阻止事件冒泡捕获
    e.stopPropagation();
    const _newData = changeEveryVal(
      itemId,
      _.cloneDeep(_dataSource),
      "deleteItem"
    );
    onChange && onChange(e, itemId, _newData);
    setDate(_newData);
  };
  // 是否显示title中的content
  const handleShowContent = (
    e: React.MouseEvent<Element, MouseEvent>,
    itemId: number,
    index: number
  ) => {
    const _newData = changeEveryVal(
      itemId,
      _.cloneDeep(_dataSource),
      "isExtend"
    );
    setDate(_newData);
  };

  // 修改内容的值
  const changeInputValue = (e: any, itemId: number, inputType: string) => {
    const { value } = e.target;
    // 阻止事件冒泡捕获
    e.stopPropagation();
    // if(!value)return
    ischangeData = changeEveryVal(
      itemId,
      _.cloneDeep(_dataSource),
      "changeInputValue",
      value,
      inputType
    );
  };

  // 新增节点
  const handleAddDot = (e: any, itemId: number,index:number, type:number) => {
    e.stopPropagation();
  //  let result =  prompt('新增同级节点还是子节点？, 1代表子节点，2代表同级节点','1')
   if(type===1){
        addToChildrenDot(e,itemId,index)
    }else if(type===2){
       addToBottomDot(e,itemId,index)
    }
  };

  const addToBottomDot=(e: any, itemId: number,index:number)=>{
    let _newData = changeEveryVal(
      itemId,
      _.cloneDeep(_dataSource),
      "handleAddBottomDot"
    );
    onChange && onChange(e, itemId, _newData);
    setDate(_newData);
    setClickCurrentId(-1);
  }

  // 递归遍历给下面的children里面都加上isContent
  const addIsContent =(array: any,type: any)=>{
      array.forEach((el: { isContent: boolean; children: any; })=>{
        el.isContent = !type
        if(el.children&&el.children instanceof Array){
          addIsContent(el.children,type)
        }
     })
    return array;
  }

  const addToChildrenDot=(e: any, itemId: number,index:number)=>{
    let _newData = changeEveryVal(
      itemId,
      _.cloneDeep(_dataSource),
      "handleAddChildrenDot"
    );
    onChange && onChange(e, itemId, _newData);
    setDate(_newData);
    setClickCurrentId(-1);
  }

  // 获取所有的id值
  const findAllId=(_arr: string | any[])=>{
    for (let i = 0; i < _arr.length; i++) {
        if (_arr[i].children instanceof Array) {
             findAllId(_arr[i].children);
             findMaxArr.push(_arr[i].children[0]&&_arr[i].id)
          }else{
            findMaxArr.push(_arr[i]&&_arr[i].id)
          }
          findMaxArr = findMaxArr.filter(el=>el!==undefined)
      }
      return findMaxArr
  }

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    itemId: number,
    index: number
  ) => {
    console.log(e, itemId, index)
    handleShowContent(e, itemId, index);
  };

  // 操作数组
  const changeEveryVal = (
    id: number,
    arr: any,
    type: string,
    value = "",
    inputType = ""
  ) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].children instanceof Array) {
        changeEveryVal(id, arr[i].children, type, value, inputType);
      }
      if (arr[i]?.id === id && type === "RadioChange") {
        arr[i].isDone = !arr[i].isDone;
      }
      if (arr[i]?.id === id && type === "isExtend") {
        let arrA = arr[i]
        arrA.isContent = !arrA.isContent;
          if(arrA.children &&  arrA.children instanceof Array){
             addIsContent(arrA.children,!arrA.isContent)
          }
      }
      if (arr[i]?.id === id && type === "changeInputValue") {
        if (inputType === "content") arr[i].content = value;
        if (inputType === "title") arr[i].title = value;
      }
      if (arr[i].id === id && type === "handleAddBottomDot") {
          let ids = findAllId(_dataSource)
          let idsLength = ids.length
          let maxId  = ids.sort((a,b)=>a-b)[idsLength-1]
          let item = {id:maxId+1, title:'',content:''}
          let idx =  arr.findIndex((el: { id: number; })=>el?.id===id)
          arr.splice(idx+1, 0, item)
      }
      if (arr[i]?.id === id && type === "handleAddChildrenDot") {
          let ids = findAllId(_dataSource)
          let idsLength = ids.length
          let maxId  = ids.sort((a,b)=>a-b)[idsLength-1]
          let idx =  arr.findIndex((el: { id: number; })=>el?.id===id)
          let item = {id:maxId+1, title:'',content:''}
          if(arr[idx].children)arr[idx].children.unshift(item)
          if(!arr[idx].children)arr[idx].children=[item]
       } 
      if (arr[i]&&arr[i].id === id && type === "deleteItem") {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  const handleMouse = (id: number) => {
    setCurrentId(id);
  };

  const renderTree = (_dataSource: any[]) => {
    // let hasChildNumber = _dataSource?.filter((el) => el?.children).length;
    if (_dataSource instanceof Array) {
      return _dataSource.map((item, index) => {
        // console.log(item,'>>>>item')
        key++;
        const rdsBgcolor = !item.isDone ? "#dc3545" : "#20c997";
        return (
          <div style={{ position: "relative" }}>
            <div className="info-wrapper"  key={key}>
              {/**新增节点 */}
              {false && isEditable&&<div
                className="dot-radio bottom"
                // onClick={(e) => handleAddDot(e, item.id, index)}
              >
                {/*<Icon icon="plus-circle"></Icon>*/}
                <br />
              </div>}
              <div
                style={{
                  backgroundColor: item.isDone !== undefined ? rdsBgcolor : "",
                }}
                className="dot-radio"
                // onMouseOver={() => handleMouse(item.id)}
                // onMouseLeave={() => handleMouse(-1)}
              >
                {isHandle && <div className="showBtns">
                    <Icon  icon={item.isContent?"chevron-up":"chevron-down"} onClick={(e) => handleClick(e, item.id, index)}/>
                    <Icon onClick={(e) => deleteCurrentItem(e, item.id, index)} icon="minus-circle" size="1x"></Icon>
                    <div className="addToBottom"  onClick={(e) => handleAddDot(e, item.id, index,2)}>
                          <Icon icon="chevron-down" className="chevron-down"/>
                          <Icon icon="plus"/>
                    </div>
                    <div  className="addToRight"  onClick={(e) => handleAddDot(e, item.id, index,1)}>
                          <Icon icon="plus"/>
                          <Icon icon="chevron-right" className="chevron-right"/>
                    </div>
                    <div key={item.id}>
                      <input
                        type="radio"
                        key={item.id}
                        defaultChecked={item.isDone}
                        onClick={(e) =>
                          radioChange && radioChange(e, item.id, index)
                        }
                      />
                    </div>
                </div>}

                {isExpand && clickCurrentId === item.id ? (
                  <Icon icon="chevron-up" size="1x" onClick={(e) => handleClick(e, item.id, index)}></Icon>
                ) : isExpand && clickCurrentId !== item.id ? (
                  <Icon icon="chevron-down" size="1x" onClick={(e) => handleClick(e, item.id, index)}></Icon>
                ) : (
                  ""
                )}
                
              </div>
              <div className="info"  style={{minHeight :item.isContent ? '0px' : '130px'}}>
                <div className="title">
                  {whichInput === "title" && clickCurrentId === item.id ? (
                    <Input
                      type="text"
                      defaultValue={
                        typeof item.title === "string"
                          ? item.title
                          : ReactDOMServer.renderToString(item.title)
                      }
                      onChange={(e) => changeInputValue(e, item.id, "title")}
                      onBlur={(e: any) => {
                        e.stopPropagation();
                        setWhichInput("");
                        setClickCurrentId(-1);
                        ischangeData.length > 0 && setDate(ischangeData);
                        ischangeData.length > 0 &&
                          onChange &&
                          onChange(e, item.id, ischangeData);
                        ischangeData = [];
                      }}
                      autoFocus
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                        item.title ? typeof item.title === "string"
                            ? item.title
                            : ReactDOMServer.renderToString(item.title):
                            '点击输入标题(支持文字、html)'
                      }}
                      onClick={() => {
                        if (!isEditable) return;
                        setClickCurrentId(item.id);
                        setWhichInput("title");
                      }}
                    />
                  )}
                </div>
                {!item.isContent && (
                  <div className="content">
                    {whichInput === "content" && clickCurrentId === item.id ? (
                      <textarea 
                          placeholder="请输入内容，支持markdown语法，html标签"
                          style={{width:"100%",minHeight:'130px'}}
                          defaultValue={
                            typeof item.content === "string"
                              ? item.content
                              : ReactDOMServer.renderToString(item.content)
                          }
                          onChange={(e) =>
                            changeInputValue(e, item.id, "content")
                          }
                          onBlur={(e: any) => {
                              e.stopPropagation();
                              setWhichInput("");
                              setClickCurrentId(-1);
                              ischangeData.length > 0 && setDate(ischangeData);
                              ischangeData.length > 0 &&
                                onChange &&
                                onChange(e, item.id, ischangeData);
                              ischangeData = [];
                            }}
                            autoFocus
                          />
                    ) : (
                      <div  
                       onClick={(e) => {
                        if (!isEditable) return;
                        e.stopPropagation();
                        setClickCurrentId(item.id);
                        setWhichInput("content");
                      }}>
                       {Util.isTestMarkDown.test(item.content)?<Markdown 
                         className="hljs"  
                         source={item.content}
                   
                        //  language="javascript"
                        />:
                       <div
                       style={{width:'100%',minHeight:100,cursor:'pointer'}}
                       dangerouslySetInnerHTML={{
                         __html:
                         item.content ? typeof item.content === "string"
                             ? item.content
                             : ReactDOMServer.renderToString(item.content) 
                             : '点击输入内容，支持markdown语法、html标签'
                       }}
                      />}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {renderTree(item.children)}
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div className={classes} {...restProps}>
      {renderTree(_dataSource)}
    </div>
  );
};

Commission.defaultProps = {
  theme: "primary",
  isEditable: false,
  isExpand: false,
  isHandle: false,
};

export default Commission;
