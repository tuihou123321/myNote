/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import { Icon,Flex} from 'antd-mobile';
import {Link} from "react-router-dom"

export default class IndexNews extends Component {
    state = {
      activeIndex:0,
      tempIndex:0,
      timer:null,
      newLists:""
    }
    componentDidMount(){
      this.setState({
        tempIndex:this.state.tempIndex+1
      })
      setTimeout(()=>{
        if(true){
          let len=this.props.newLists.length;
          setInterval(()=>{
            let {activeIndex}=this.state;
            if(activeIndex+1<len){
              ++activeIndex;
            }
            else{
              activeIndex=0;
            }
            this.setState({
              activeIndex
            })
          },3000)
        }
      },5000)
    }
    render() {
      let {newLists}=this.props;
      let {activeIndex}=this.state;
      return (
            <div className="p10">
                <Flex justify="between" align="center">
                    <Flex>
                        <div style={{paddingRight:"0.1rem",borderRight:"1px solid #ddd",marginRight:"0.1rem"}}>
                            <img src={require("../../static/images/zhinan.png")} alt="" style={{height:"0.2rem"}}/>
                        </div>
                        <div className="line1" style={{width:"2rem"}}>
                            <Link to="/help">
                              {
                                newLists[activeIndex] && newLists[activeIndex].title
                              }
                            </Link>
                        </div>
                    </Flex>
                    <Flex>
                        <div className="fr">
                            <Link to="/help">
                                <div style={{width:"0.25rem",height:"0.25rem",background:"#ebeef0"}} className="tac bdrs50p">
                                    <Icon type="right" style={{color:"#84b5db",marginTop:"0.02rem"}}/>
                                </div>
                            </Link>
                        </div>
                    </Flex>
                </Flex>
            </div>
        );
    }
}
