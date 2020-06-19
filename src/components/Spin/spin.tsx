import React, { ReactElement } from 'react'
interface SpinProps{
    delay?:number;
    indicator?:ReactElement;
    size?:"small" |  "default" | "large";
    loading?:boolean;
    tip?:string;
}
const Spin:React.FC<SpinProps> =(props)=> {
    const {loading} =props;
    if(loading){
        return(
            <div className="spin_wrapper">
                <p className="click_block"/>
            </div>
            )
       }
    return <></>
}
export default Spin;