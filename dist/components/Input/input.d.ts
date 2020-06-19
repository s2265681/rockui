import { InputHTMLAttributes, ReactElement, FC, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 禁用 */
    disabled?: boolean;
    /** 设置 input 大小 ， 支持 lg 或者 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    addonBefore?: string | ReactElement;
    /**添加后缀 用于配置一些固定组合 */
    addonAfter?: string | ReactElement;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
export declare const Input: FC<InputProps>;
export default Input;
