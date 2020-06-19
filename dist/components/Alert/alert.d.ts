import React from "react";
interface BaseAlertProps {
    className?: string;
    type?: "success" | "info" | "warning" | "error";
    message?: string;
}
declare type NaticeDivProps = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>;
export declare type AlertProps = Partial<NaticeDivProps>;
declare const Alert: React.FC<AlertProps>;
export default Alert;
