import React, { useState,useEffect } from "react";
import Mask from "../Mask";

type blockObj = {
  width:number;
  height:number;
  pointX:number;
  pointY:number;
}

interface Props {
  blockInfo?: blockObj;
  onChange?:(info:blockObj)=>void
}

const HandleBlock: React.FC<Props> = (props) => {
  const {onChange,blockInfo} = props;
  const [block, setBlock] = useState( blockInfo ||
    { 
    width: 200, height: 200,
    pointX : 300, pointY : 100
   });
  const [isdragging, setIsdraging] = useState(false);
  const [moveOrScale, setMoveOrScale] = useState<string>("move");
  const [scalePoint,setScalePoint] = useState({startX:0,startY:0});
  const [scaleDir,setScaleDir] = useState<string>('right')

  useEffect(()=>{
     localStorage.setItem('block-demo',JSON.stringify(block))
     onChange&&onChange(block)
  },[block, onChange])
  // 移动鼠标按下
  const handleMoveDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsdraging(true);
    setMoveOrScale("move");
    let startX = e.pageX;
    let startY = e.pageY;
    let handle_box = document.querySelector("#handle_box");
    let width: any = handle_box?.clientWidth;
    let height: any = handle_box?.clientHeight;
    setBlock({
      ...block,
      pointX: startX - width / 2,
      pointY: startY - height / 2 
    })
  };

  // 缩放鼠标按下
  const handleScaleEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dir:string
  ) => {
    e.stopPropagation();
    setIsdraging(true);
    setMoveOrScale('scale')
    setScaleDir(dir)
    setScalePoint({startX:e.pageX - block.width ,startY:e.pageY - block.height})
  };

   // 移动或者缩放鼠标拖动
   const handleMove = (e: any) => {
    let startX = e.pageX;
    let startY = e.pageY;
    if(moveOrScale==='move'){
    let handle_box = document.querySelector("#handle_box");
    let width: any = handle_box?.clientWidth;
    let height: any = handle_box?.clientHeight;
    setBlock({
      ...block,
      pointX: startX - width / 2,
      pointY: startY - height / 2 
    })
    }else if(moveOrScale==='scale'){
        let offsetX =  e.pageX - scalePoint.startX;
        let offsetY =  e.pageY - scalePoint.startY;
        let width = offsetX
        let height = offsetY
        scaleDir ==='right' &&  setBlock({...block,width})
        scaleDir ==='bottom' &&  setBlock({...block,height})
        scaleDir ==='left-bottom' && setBlock({...block,width,height})
    }
  };

  // 移动或者缩放鼠标抬起
  const handleMoveUp = (e: any) => {
    setIsdraging(false);
    setMoveOrScale("move");
    setScaleDir('right')
  };
  return (
    <div className="handle_box_wrapper">
      <div
        className="box"
        style={{
          left: block.pointX,
          top: block.pointY,
          width: block.width,
          height: block.height,
        }}
        onMouseDown={(e) => handleMoveDown(e)}
        id="handle_box"
      >
        <div
          className="move-right"
          onMouseDown={(e) => handleScaleEnter(e,'right')}
          style={{ height: block.height }}
        >
          ||
        </div>
          <div
              className="move-bottom"
              onMouseDown={(e) => handleScaleEnter(e,'bottom')}
              style={{ width: block.width }}
            >
               =
            </div>
          <div 
              className="move-right-bottom"
              onMouseDown={(e) => handleScaleEnter(e,'left-bottom')}
            >
              *
        </div>
      </div>
      <Mask
        visible={isdragging}
        onMouseMove={handleMove}
        onMouseUp={handleMoveUp}
      />
    </div>
  );
};

export default HandleBlock;
