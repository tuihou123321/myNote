/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { NavBar} from 'antd-mobile';
import {getPsyLists,getPsyCategories} from "../../../api/api"
import Nav from "../../../components/Nav/Nav"
import PsyListsIndex from "../../../components/PsyListsIndex/PsyListsIndex"
import {setDocumentTitle} from "../../../static/js/public";


export default class Psy extends Component {
   state = {
    companyLogo:null,
    banner:"",
    course:[],
    testData:[],
    tabs:[],
    total:0
  };
  getPsyCategories(){
    getPsyCategories({},(result)=>{
      this.setState({
        tabs:result
      },()=>{
        let {tabs}=this.state;
        if(tabs.length>0){
          this.getPsyLists(tabs[0].id);
        }
      })
    })
  }
  getPsyLists(id){
    getPsyLists({cateId:id,page:1,pageSize:3},(result)=>{
      let {list}=result
      this.setState({
        testData:[]
      },()=>{
        this.setState({
          testData:list
        })
      })
    })
  }
  componentDidMount(){
    setDocumentTitle();
    //选判断是否有数据
    let params={
      cateId:"",
      page:1,
      pageSize:1
    }
    getPsyLists(params,(result)=>{
      let {total}=result;
      if(total>0){
        localStorage.setItem("hasActicle",total)
      }
      this.setState({
        total
      },()=>{
        if(this.state.total>0){
          //开始正常请求，默认从第一个开始
          this.getPsyCategories();
        }
      })
    })
  }
    render() {
     let {history} = this.props;
     let {tabs, testData}=this.state;
     //公安厅项目：过滤掉不是[危机化解]的
     tabs=tabs.filter(item=> item.catName!=="危机化解")
        return (
          <div>
            {
              this.state.total>0 && <div>
                <div className="pt10">
                  <NavBar
                    mode="light"
                    leftContent={<span className="fz20 c3"><b>心理资讯</b></span>}
                    rightContent={<span  onClick={()=>history.push("/psy")} className="fz14 grey">更多</span>}
                    style={{}}
                  />
                </div>
                <Nav tabs={tabs} getListsData={(id)=>this.getPsyLists(id)}/>
                <div className="pt0">
                  <div className="lists">
                    {
                      PsyListsIndex(testData,false)
                    }
                  </div>
                </div>
                <div className={"blank"}/>
              </div>
            }
          </div>
        );
    }
}
