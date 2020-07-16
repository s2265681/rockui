import React from 'react';
interface App {
    history?: any;
    location?: any;
    children?: any;
    search?: any;
}
interface AnimationProps extends App {
    /**延迟时间(可选),默认middle,*/
    delayTime?: "fast" | "middle" | "slow";
    /**控制显示隐藏，必填 */
    isShow?: boolean;
    /** 动画名称 淡入 淡出，默认fade*/
    name?: 'fade' | 'slip';
    /**children必填 */
    children: any;
    /** changeChild 是否会根据子元素的更新而调用，默认不会*/
    changeChild?: boolean;
    /**className */
    className?: string | object;
    /** intDir 动画进入的方向 */
    intDir?: "left" | "right" | "top" | "bottom";
    /** intDir 动画离开的方向 */
    outDir?: "left" | "right" | "top" | "bottom";
}
/**
 * Animation 简单的动画组件
 * @class
 * @param isShow?: "true" | "false"
 * @param name?: "fade" | "slip"
 * @param delayTime?: "fast" | "middle" | "slow"
 * @param intDir?:"left" | "right" | "top" | "bottom"
 * @param outDir?:"left" | "right" | "top" | "bottom"
 * @extends {React.FC<AnimationProps>}
 */
declare const Animation: React.FC<AnimationProps>;
export default Animation;
