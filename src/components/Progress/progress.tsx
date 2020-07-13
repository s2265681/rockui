import React, { CSSProperties } from 'react'
import { ThemeProps } from '../Icon/icon'

interface ProgressProps{
    percent:number;
    showText?:boolean;
    strokeHeight?:number,
    styles?:CSSProperties,
    theme?:ThemeProps
}
const Progress:React.FC<ProgressProps> =(props)=> {
    const {percent,showText,strokeHeight,styles,theme} =props;
        return(
            <div className="rock-progress-bar" style={styles}>
                <div className="rock-progress-bar-outer" style={{height:strokeHeight}}>
                     <div 
                     className={`rock-progress-bar-inner 
                     color-${theme}`}
                     style={{width: `${percent}%`}}
                     >
                           {showText && <span className="inner-text">{percent}%</span>}
                     </div>
                </div>
            </div>
 )
}

Progress.defaultProps={
    strokeHeight:15,
    showText:true,
    theme: "primary",
}
export default Progress;