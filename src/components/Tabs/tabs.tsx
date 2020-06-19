import React,{createContext,useState} from "react";
import classNames from "classnames";
import {TabsItemProps} from './tabsItem'
type SelectCallback = (selectedIndex:number) => void;

export interface TabsProps{
    defaultIndex?:number;
    className?:string;
    style?:React.CSSProperties;
    onSelect?:SelectCallback;
}


interface ITabsContext{
    index:number;
    onSelect?:SelectCallback;
}
export const TabsContext = createContext<ITabsContext>({index:0})

const Tabs:React.FC<TabsProps>=(props)=>{
    const {defaultIndex,className,style,children,onSelect} = props;
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('tabs',className)
    const handleClick = (index:number) =>{
        setActive(index)
        if(onSelect)onSelect(index)
     }
     const passedContext:ITabsContext={
        index:currentActive||0,
        onSelect:handleClick,
    }
    const renderChildren=()=>{
        return React.Children.map(children,(child,index)=>{
            let childrenElement = child as React.FunctionComponentElement<TabsItemProps>
            return React.cloneElement(childrenElement,{index})
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-tabs">
            <TabsContext.Provider value={passedContext}>
                {renderChildren()}
            </TabsContext.Provider>
        </ul>
    )
}

export default Tabs;

