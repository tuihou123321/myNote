/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import {Tabs} from "antd-mobile"
import LoadMore from "../../components/LoadMore/LoadMore"
import {getPsyLists,getCourseList} from "../../api/api";
import CourseLists from "../../components/CourseLists/CourseLists"
import PsyLists from "../../components/PsyLists/PsyLists"
import {getParameterByName} from "../../static/js/common";

let tabs=[
  {
    id:1,
    title:"心理文章",
    type:"article"
  },
  {
    id:2,
    title:"心理课程",
    type:"course"
  }
]

export default class PsyMember extends Component {
  state = {
    tabs:tabs,
    type:getParameterByName("type"),
    listsDataArticle:[],
    listsDataTest:[]
  };
  tabsFn =(type)=>{
    let pathname=this.props.match.path;
    window.h.replace(`${pathname}?type=${type}`);
    this.setState({
      type
     })
  }
  render() {
    let {tabs,type}=this.state;
    return (
      <div>
        <Header title={"心理委员"} url={"/mHome"}/>
        <div className={"fix w100p bg-white z1"} style={{marginTop:"0rem"}}>
          <Tabs tabs={tabs} onTabClick={(item)=>{this.tabsFn(item.type)}} initialPage={type==="course"?1:0}/>
        </div>
        <div style={{marginTop:"0.4rem"}}/>
         <div>
           {
             type==="course" && <LoadMore
               fetchApi={getCourseList}
               parmas={{position:2}}
               ListComponent={CourseLists}/>
           }
         </div>

          <div>
            {
              type!=="course" &&     <LoadMore
                fetchApi={getPsyLists}
                parmas={{cateId:99999}}
                ListComponent={PsyLists}/>
            }
          </div>

      </div>
    );
  }
}
