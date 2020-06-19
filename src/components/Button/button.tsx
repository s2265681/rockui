import React,{ButtonHTMLAttributes,AnchorHTMLAttributes,FC,ReactNode} from "react";
import classNames from "classnames";
export enum ButtonSize {
    Large = "lg",
    Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Dashed = "dashed",
  Danger = "danger",
  Link = "link",
}

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: "lg" | "sm";
  // btnType?: ButtonType;
  /**设置 Button 的类型 */
  btnType?: "primary" | "default" | "dashed" | "danger" | "link";
  children: ReactNode;
  href?: string;
}



type NaticeButonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NaticeButonProps & AnchorButtonProps>;  // 改为可选
/**
 * 这是我们的第一个Button组件
 * ## Button header
 * ~~~js
 * import {BUtton} from 'rockui'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const { btnType,className, disabled, size, href,  children , ...restProps} = props;
  // btn , btn-lg , btn-primary
  const classes = classNames("btn", className , {
    [`btn-${btnType}`]: btnType, // btnType存在就添加上这个[`btn-${btnType}`] class
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return <button className={classes} disabled={disabled}  {...restProps}>{children}</button>;
  }
};


Button.defaultProps = {
    disabled:false,
    btnType: "default"
}

export default Button;