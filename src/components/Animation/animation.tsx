import React,{useState,useEffect, useRef} from 'react'
import ReactDOM from 'react-dom';
import classnames from "classnames";
interface App{
    history?:any;
    location?:any;
    children?:any;
    search?:any;
}

interface AnimationProps extends App{
    /**延迟时间(可选),默认middle,*/
    delayTime?: "fast" | "middle" | "slow";
    /**控制显示隐藏，必填 */
    isShow?:boolean;
    /** 动画名称 淡入 淡出，默认fade*/
    name?:'fade' | 'slip';
    /**children必填 */
    children:any
    /** changeChild 是否会根据子元素的更新而调用，默认不会*/
    changeChild?:boolean;
    /**className */
    className?:string|object;
    /** intDir 动画进入的方向 */
    intDir?:"left" | "right" | "top" | "bottom";
    /** intDir 动画离开的方向 */
    outDir?:"left" | "right" | "top" | "bottom"
}

const mapTime={
   "fast":500,
   "middle":1000,
   "slow":2000
}

let clasS: string | undefined; 
let timer:any;
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
const Animation:React.FC<AnimationProps>=(props)=> {
    const { className,name,isShow,children, delayTime="middle" , intDir="",outDir="",changeChild } = props;
    const [classes,setClassess] = useState("")
    const [delayClear,setDelayClear] = useState(true);
    const childrenName  = children.props.className;

    useEffect(()=>{
        handleAnimate()
        return () =>{
           setDelayClear(true)
           clearTimeout(timer)
        }
    },[isShow,changeChild&&children])

    const handleAnimate=()=>{
        if(isShow){
            clasS = classnames("animated",className,childrenName,{
                [`animate-${name}-${intDir}-in`] : name,
                [`duration-${delayTime}-time`]:delayTime
            })
            timer = setTimeout(()=>{
                setClassess(classnames(className,childrenName))
            },mapTime[delayTime])
        }else{
            clasS = classnames("animated",childrenName,className,{
                [`animate-${name}-${outDir}-out`] : name,
                [`duration-${delayTime}-time`]:delayTime
            })
            timer = setTimeout(()=>{
                setDelayClear(false)
                setClassess(classnames(className,childrenName))
            },mapTime[delayTime])
        }
        setClassess(clasS)
    }

    function handleAnimationEnd(){
        //  console.log('动画结束执行');
    }

    const element = {
        ...children,
        props: {
            ...children.props,
            className: classes ,
            onAnimationEnd: handleAnimationEnd()
        },
    };
    return  delayClear &&  element;
}

Animation.defaultProps={
    name:'fade',
    isShow:true,
    delayTime:"middle",
    changeChild:false
}

export default Animation;