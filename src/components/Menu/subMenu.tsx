import React,{useContext,useState, ReactElement} from "react";
import classNames from "classnames";
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'
import Icon from '../Icon/icon'
// import Animation from '../Animation'

export interface SubMenuProps{
    index?:string;
    title:ReactElement|string;
    className?:string;
}

const SubMenu:React.FC<SubMenuProps>=({index,title,children,className})=>{
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode ==='vertical')?openedSubMenus.includes(index):false
    const [menuOpen,setOpen]= useState(isOpend)

    const classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-vitical":context.mode ==='vertical',
        'menu-open':menuOpen,
    });

    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!menuOpen)
        if(context.onSelect&&(typeof index==='number')){
            context.onSelect(index)
        }
    }

    let timer:any;
    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer)
        e.preventDefault()
        timer=setTimeout(()=>{
             setOpen(toggle)
        },300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick:handleClick
    }:{}
    const hoverEvents = context.mode !== 'vertical' ? {
       onMouseEnter:(e:React.MouseEvent)=>{ handleMouse(e,true)},
       onMouseLeave:(e:React.MouseEvent)=>{ handleMouse(e,false)}
    }:{}
    const renderChildren=()=>{
        const subMenuClasses = classNames('submenu',{
            'menu-open':menuOpen,
        })
        const childrenComponent = React.Children.map(children,(child,i)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} =  childElement.type
            if(displayName==='MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.error('Warning:SubMenu has a child which is not a MenuItem component');
            }
        })
        return(
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
        )
    }
    return(
       <li key={index} className={classes} {...hoverEvents}>
         <div className="submenu-title" {...clickEvents}>
           {title}
           <Icon icon='angle-down' className="down-icon" theme="primary" size="1x"/>
               {renderChildren()}
         </div>
       </li> 
    )
}

SubMenu.displayName = "SubMenu"
export default SubMenu;