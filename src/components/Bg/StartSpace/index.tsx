import React,{useEffect} from 'react'
import classNames from "classnames";
// import './index.scss'

type animationType  = ''|'down'|'left'

interface Props{
   animationType?:animationType,
   className?:string,
   restProps?:any
}

function getStarts(num=100){
    let doms = "",
    randomSize,
    randomLeft,
    randomTop,
    opacity,
    animation;
    for(let i=0;i<num;i++){
        randomTop = Math.floor(Math.random()*100) + '%';
        randomLeft = Math.floor(Math.random()*100) + '%';
        randomSize = Math.floor(Math.random()*10) + 'px';
        opacity = Math.random()*10;
        animation = `aniStart ${Math.random()*10+3}s ease-in-out infinite` 
        doms += `
           <div 
               class="startSty heart"
               style="
               top:${randomTop};
               left:${randomLeft};
               width:${randomSize};
               height:${randomSize};
               animation:${animation};
               opacity:${opacity}"
            >
           </div>
        `
    }
    return doms
}

const StartSpace:React.FC<Props> =(props)=> {
    const { animationType, className, ...restProps } = props;
    const classess = classNames('start_wrapper',className , {
        [`turn-${animationType}`] : animationType
    })
    console.log(restProps,'restProps');
    console.log(classess,'classess');
    useEffect(()=>{
      const start =  document.getElementById('start');
      if(start){
          start.classList.add(`start_wrapper_comeIn-${animationType}`)
          start.innerHTML = getStarts(100)
      }
    },[])
    return (
        <div className={classess} id="start" {...restProps}></div>
    )
}

export default StartSpace;