import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames";
import { FontAwesomeIcon,FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
library.add(fas)

// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info'|'danger' |'warning';

export interface IconProps extends FontAwesomeIconProps{
    theme?:ThemeProps
}
/**
 * 
 * @param props 
 * @license https://fontawesome.com/icons?d=gallery
 */
export const Icon:React.FC<IconProps>=(props)=>{
    // icon-primary
    const {className,theme,...restProps} = props;
    const classes = classNames('rock-icon',className,{
        [`icon-${theme}`]:theme
    })
    return(
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}

export default Icon;