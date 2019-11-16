/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import { docterLists } from "../../api/api"
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
              <Header title="专家团队"/>
              <LoadMore
                fetchApi={docterLists}
                ListComponent={(listsData)=>{
                  return listsData ? listsData.map((item,index)=> <Item3_3 key={index} item={item}/>):null;
                }}
              />
            </div>
        );
    }
}
