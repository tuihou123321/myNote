/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';

export default function SmallLoading(){
       return (
         <div className="tac p10 df jcc" style={{backgroundColor:"#f2f5f7"}}>
           {/*<Icon type={"loading"}  size={"sm"}/>*/}
           <span className={"pb10 c6"}>正在加载更多...</span>
         </div>
       )
}
