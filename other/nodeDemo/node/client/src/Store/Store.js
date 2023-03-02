/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import {createStore} from "redux"
import { devToolsEnhancer } from 'redux-devtools-extension';


//改变store中的值,store中的默认值；
let states={
    total:0
}

//state就原来整个状态机的数据状态
//action是要传入的{type:add,value}
function changeTotal(state=states,action){
    let {type,total}=action;
    if(total){
        state.total=total;
    }
    return  state;
}

//创建store仓库
export let store=createStore(changeTotal,devToolsEnhancer(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
));

export default {
    store
}

