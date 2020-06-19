import React from "react";
import StartSpace from './StartSpace';

type animationType  = ''|'down'|'left';

  interface BgProps {
    className?: string;
    animationType?:animationType,
    type?:'start',
    style?:any
  }

  const Bg:React.FC<BgProps>=(props)=>{
     const {animationType,className,type,...restProps} = props;
     return(
         <div>
             {type==='start'&&<StartSpace  animationType={animationType} {...restProps}/>}
         </div>
     )
  }

  Bg.defaultProps={
    animationType:'',
    type:'start'
  }

  export default Bg;