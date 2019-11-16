/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import { docterListsSelf } from "../../api/api"
import Item3_3 from "../../components/Item/Item3_3"
import LoadMore from "../../components/LoadMore/LoadMore"

export default class PsyList extends Component {
  state = {
    listsData:[],
    page:1,
    pageSize:10,
    loading: true,
    total:null
  };
    render() {
        return (
            <div>
              <Header title="心理专家"/>
              <LoadMore
                fetchApi={docterListsSelf}
                ListComponent={(listsData)=>{
                  return listsData ? listsData.map((item,index)=> <Item3_3 key={index} item={item} jumpToM={true}/>):null;
                }}
              />
            </div>
        );
    }
}
