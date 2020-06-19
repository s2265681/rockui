import { ButtonHTMLAttributes, AnchorHTMLAttributes, FC, ReactNode } from "react";
export declare enum ButtonSize {
    Large = "lg",
    Small = "sm"
}
export declare enum ButtonType {
    Primary = "primary",
    Default = "default",
    Dashed = "dashed",
    Danger = "danger",
    Link = "link"
}
interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: "lg" | "sm";
    /**设置 Button 的类型 */
    btnType?: "primary" | "default" | "dashed" | "danger" | "link";
    children: ReactNode;
    href?: string;
}
declare type NaticeButonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NaticeButonProps & AnchorButtonProps>;
/**
 * 这是我们的第一个Button组件
 * ## Button header
 * ~~~js
 * import {BUtton} from 'rockui'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
