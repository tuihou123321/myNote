/**
 * Created by mqd on ${DATE}.
 */
import React  from 'react';
import "./ConfideLists.css"
import head from "../../static/images/100.png"
import Item3_2 from "../Item/Item3_2"

export default function UserConfideLists(lists){
  return (
    <div className="bg-white  pl15">
      {
        lists.map((item,index)=>{
          if(!item.head){
            item.head=head;
          }
          let isCanCall=false;
          let {scheduleIsOneline,handIsOnline,status,isWelfare}=item;
          //status为1时空闲
          //scheduleIsOneline和handIsOnline  值都为1时为在线
          if(isWelfare===1){
            isCanCall=true;
          }else{
            if(scheduleIsOneline===1 && handIsOnline===1 && status===1){
              isCanCall=true;
            }
          }
          return (
            <div  key={index}>
              <Item3_2 {...{item,isCanCall}}/>
            </div>
          )
        })
      }
    </div>
  );
}

