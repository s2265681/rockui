import React,{useContext} from "react";
import classNames from "classnames";
import {TabsContext} from './tabs'
import Animation from '../Animation'
export interface TabsItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    label?:string;
  }

const TabsItem: React.FC<TabsItemProps> = (props) => {
    const { index, className, disabled, style, children,label } = props;
    const context = useContext(TabsContext)
    const classes = classNames("tabs-item", className, {
      "is-disabled": disabled,
      "is-active": context.index === index,
    });
    const handleClick=()=>{
        if(context.onSelect&&!disabled&&(typeof index==='number')){
            context.onSelect(index)
        }
    }
    return (
      <div className="tab-item-wrapper">
        <li className={classes} style={style} onClick={handleClick}>
           {label}
        </li>
        <Animation changeChild name="fade">
        <div style={{display: context.index === index?'block':'none'}}>
           {children}
        </div>
        </Animation>
      </div>
    );
  };
  TabsItem.defaultProps = {
    index: 0,
  };
  
  TabsItem.displayName='TabsItem'
  export default TabsItem;
  