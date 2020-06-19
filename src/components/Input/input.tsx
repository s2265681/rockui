import React,{InputHTMLAttributes,ReactElement,FC,ChangeEvent} from 'react';
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = "lg" | "sm"

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
   /** 禁用 */
   disabled?:boolean;
   /** 设置 input 大小 ， 支持 lg 或者 sm */
   size?: InputSize;
   /**添加图标，在右侧悬浮添加一个图标，用于提示 */
   icon?:IconProp;
   /**添加前缀 用于配置一些固定组合 */
   addonBefore?:string|ReactElement;
   /**添加后缀 用于配置一些固定组合 */
   addonAfter?:string|ReactElement;
   className?:string;
   onChange?:(e:ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基本的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'rockui'
 * ~~~
 * 支持 HTNLInput 的所有基本属性
 */
export const Input:FC<InputProps> = (props)=> {
    const {
        disabled,
        size,
        icon,
        addonBefore,
        addonAfter,
        className,
        style,
        ...restProps
       } = props
    // classes
    const classess = classNames("rock-input-wrapper",className,{
       'is-disabled':disabled,
       [`input-size-${size}`] : size,
       'input-group':addonBefore || addonAfter,
       'input-group-addonBefore':addonBefore,
       'input-group-addonAfter':addonAfter
    })

    const fixControlledValue = (value:any) => {
        if(typeof value === "undefined" || value ===null ){
            return ''
        }
        return value
    }

    if('value' in props){  // 'name' in {name:'12'} true
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    
    return (
        <div className={classess} style={style}>
           {addonBefore && <div className="rock-input-group-addonBefore">{addonBefore}</div>}
           {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
            <input 
                className="rock-input-inner" 
                disabled={disabled}  
                {...restProps}
            >
            </input>
            {addonAfter && <div className="rock-input-group-addonAfter">{addonAfter}</div>}
        </div>
    )
}

Input.defaultProps={
    disabled:false
}

export default Input;