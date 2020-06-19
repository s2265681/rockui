import React,{useState} from 'react';
import { storiesOf } from '@storybook/react';
import  Animation from './animation'
import Button from '../Button';

const Odiv=(text:string)=>(
    <div style={{width:400,height:400,background:'#ff0'}}>
        {text}
    </div>
)

const defaultAnimation =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation isShow={toggle}>
            {Odiv("defaultAnimation")}
        </Animation>
     </>
}
const AnimationTime =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation 
        isShow={toggle}
        delayTime="slow"
        >
        {Odiv("set slow Animation Time")}
        </Animation>
     </>
}

const AnimationType =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation 
            isShow={toggle}
            name="slip"
        >
        {Odiv("set Animation type slip")}
        </Animation>
     </>
}


const AnimationType1 =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation 
            isShow={toggle}
            name="slip"
            intDir="top"
        >
        {Odiv("set Animation slip intDir top")}
        </Animation>
     </>
}



const AnimationType2 =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation 
            isShow={toggle}
            name="slip"
            outDir="right"
        >
        {Odiv("set Animation slip outDir right")}
        </Animation>
     </>
}


const AnimationType3 =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation 
            isShow={toggle}
            name="fade"
            intDir="top"
        >
        {Odiv("set  Animation  fade intDir top")}
        </Animation>
     </>
}

const AnimationType4 =()=>{
    const [toggle,setToggle] = useState(true)
    return <>
        <Button onClick={()=>setToggle(!toggle)}>Toggle</Button>
        <Animation 
            isShow={toggle}
            name="fade"
            outDir="right"
        >
        {Odiv("set  Animation  fade outDir right")}
        </Animation>
     </>
}



storiesOf('Animation 动画',module)

.add('设置动画效果是否展示isShow',defaultAnimation)
.add('设置动画效果时间delayTime(fast|middle|slow)',AnimationTime)
.add('设置动画切换类型name(fade|slip)',AnimationType)
.add('设置动画滑入方向intDir(left|bottom|top|right)',AnimationType1)
.add('设置动画滑出方向outDir(left|bottom|top|right)',AnimationType2)
.add('设置动画淡入方向intDir(left|bottom|top|right)',AnimationType3)
.add('设置动画淡出方向outDir(left|bottom|top|right)',AnimationType4)