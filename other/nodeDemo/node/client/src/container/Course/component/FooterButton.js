/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';

export default function FooterButton(isBuy,demoOption,CurrentId,id,buy,history){
  return (
      <div className={"fix b0 w100p h50"} style={{lineHeight:"0.5rem",zIndex:2}}>
        {
          !isBuy ? <div className={"df fz16 tac"}>
            {
              (()=>{
                if(demoOption===1){
                  return   <div  className={"fx1 c3"} style={{background:"#f0f2f5"}} onClick={()=>history.push(`/course/playDemo/${CurrentId}/0`)}> 试听课程 </div>
                }
              })()
            }
            <div  className={"fx2 bg-blue white"} onClick={()=>buy()}>
              购买系列课程
            </div>
          </div>
            : <div className={"df fz16 tac"}> <div className={"fx2 bg-blue white"} onClick={()=>history.push(`/course/play/${id}/0`)}>
            进入课程
          </div></div>
        }
      </div>
  )
}

