/**
 * Created by mqd on ${DATE}.
 */
import React from 'react';
import "./TestLists.css"
import Item2_2 from "../Item/Item2_2"


//代表是否是首页
export default function PsyLists(lists,isIndex){
        return (
            <div className="bg-white lists2 bdb1-warp pr15 pl15">
                {lists.map((item,index)=> <Item2_2 key={index} item={item}/>)}
            </div>
        );
}

