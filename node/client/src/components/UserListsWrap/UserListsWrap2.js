/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import Footer from "../Footer/Footer";
import SmallLoading from "../SmallLoading/SmallLoading"

export default  function UserListsWrap(loading,total,isLoadOver){
  let isNoMore=false;
  if(isLoadOver && total!==0){
    isNoMore=true;
  }
  let isNoMore2=false;
  if(isLoadOver && total===0){
    isNoMore2=true;
  }
  return (
    <div>
      <div className={"blank"}></div>
      {!loading && <SmallLoading/>}
      {isNoMore2 && <div className="w100p tac pt40 pb40 bg-white">暂无数据</div>}
      {isNoMore && <div className="w100p tac pb10 c9" style={{background:"#f2f5f7"}}>没有更多了</div>}
      {isLoadOver && Footer()}
    </div>
  );
}

