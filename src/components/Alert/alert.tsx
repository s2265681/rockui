import React from "react";
import classNames from "classnames";

// export enum AlertType {
//     Success = "success",
//     Info = "info",
//     Warning = "warning",
//     Error = "error"
//   }

  interface BaseAlertProps {
    className?: string;
    type?:"success" | "info" | "warning" | "error";
    message?:string;
  }
  type NaticeDivProps = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>
  export type AlertProps = Partial<NaticeDivProps>;  // 改为可选

  const Alert:React.FC<AlertProps>=(props)=>{
     const {type,className,message,...restProps} = props;
     const classes = classNames("alert",className,{
         [`alert-${type}`]:type
     })
     return(
         <div className={classes} {...restProps}>
             {message}
         </div>
     )
  }

  Alert.defaultProps={
    type:"success",
    message:'please input message'
  }

  export default Alert;