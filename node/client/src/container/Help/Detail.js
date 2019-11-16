/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import { Icon} from 'antd-mobile';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CutOff from "../../components/CutOff/CutOff"
import {getHelpDetail} from "../../api/api"


export default class HelpDetail extends Component {
    state = {
      content:"",
      title:"",
      isLoad:true
    }
    componentDidMount(){
        let {location}=this.props;
        let arr=location.pathname.split("/");
        if(arr.length){
            let id=arr[arr.length-1];
            let params={id:id};
             getHelpDetail(params,(result)=>{
               let {title,content,id}=result;
               this.setState({
                 id,
                 title,
                 content,
                 isLoad:false
               })
             });
        }
    }
    render() {
        let {history}=this.props;
        return (
            <div>
                <Header title="帮助" border="true" history={history}/>
                <div className="p10 pt20 pb20">
                    {this.state.isLoad?(
                        <div className="tac pt20 pb20">
                            <Icon type="loading" size="md"/>
                            <p className="grey">加载中...</p>
                        </div>
                    ):(
                        <div>
                            <h1 className="fz18 mb20" style={{borderLeft:"0.05rem solid #3d9eff",paddingLeft:"0.05rem"}}>{this.state.title}</h1>
                            <div className="fz14" style={{color:"#4c4c4c"}}>
                              <div dangerouslySetInnerHTML={{ __html: this.state.content}}/>
                            </div>
                        </div>
                    )}
                </div>
                { CutOff() }
                <Footer/>
            </div>
        );
    }
}
