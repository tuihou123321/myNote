/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { Toast,List,TextareaItem,Button,Icon,Modal} from 'antd-mobile';
import {getMessageDetail,messageAskMore} from "../../api/api"
import MessageTop from "../../components/MessageTop/MessageTop"
import "./Detail.css"
import Layout from "../../layout/Layout"
import defaultImg from "../../static/images/default.png"
import Banner from "../../mock/commonData/Banner"

export default class Detail extends Component {
   state = {
       question:[],
       loading:true,
       open:false,
       messageContent:"",
       moreAsks:[],
       replies:[],
       userHead:""
    };
    getIndexDate=(spread)=>{
        Toast.loading("加载中",0)
        let id=this.props.match.params.id;
        getMessageDetail({id},(result)=>{
            let {replies,moreAsks}=result;
            let question=[];
            question.push(result);
            if(spread){question[0].isOpen=true;}
            this.setState({
                question,
                moreAsks,
                replies
            })
            Toast.hide();
        })
   }
    componentDidMount=()=>{
        this.getIndexDate();
        let userHead=localStorage.getItem("userHead");
        if(userHead){
          this.setState({
            userHead
          })
        }
    }
    addQuestion=()=>{
        this.setState({
            open:true
         },()=>{
            setTimeout(()=>{
                // this.autoFocusInst.focus();
            },1000)
        })
    }
    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    }
    submitFun=()=>{
        Toast.loading("加载中",0)
        let params={
            content:this.state.messageContent,
            id: this.props.match.params.id
        }
        messageAskMore(params,(result)=>{
            //重新请求数据并打开
            this.getIndexDate("spread");
            this.setState({
                open:false
            })
            Toast.hide();
        },(err)=>{
            Toast.fail(err)
            this.setState({
                open:false
            })
            Toast.hide();
        })
    }
    addOpen=(i)=>{
        let {replies}=this.state;
         replies.forEach((item,index)=>{
             if(index===i){
                 item.isOpen=true;
             }
         })
        this.setState({
            replies
        })
    }
    addOpenTop=(i)=>{
        let {question}=this.state;
        question.forEach((item,index)=>{
            if(index===i){
                item.isOpen=true;
            }
        })
        this.setState({
            question
        })
    }
    render() {
        let {question,messageContent,open,replies,moreAsks,userHead}=this.state;
        let sidebar=( <Modal
            popup
            visible={open}
            onClose={()=>this.setState({open:false})}
            animationType="slide-up"
        >
            <List  className="popup-list">
                <List.Item>
                    <TextareaItem
                        rows={3}
                        count={500}
                        placeholder={"请详细描述您要咨询的问题，有利于咨询师更好的答复"}
                        value={messageContent}
                        onChange={(value)=>this.setState({messageContent:value})}
                        ref={el => this.autoFocusInst = el}
                    />
                </List.Item>
                <List.Item>
                    <Button type={"primary"} loading={false}  onClick={this.submitFun}>提交</Button>
                </List.Item>
            </List>
        </Modal>)

        return (
            <Layout title={"留言详情"} url={"/Message/Record"}>
                {sidebar}
                <MessageTop lists={question} addQuestion={this.addQuestion} moreAsks={moreAsks} addOpenTop={(index)=>this.addOpenTop(index)}/>
                <div className={"pr15 pl15 bg-white"}>
                    <div className={"p10 pl0 pr0"}>
                        <h3 className={"fz15"}>
                            留言回复 <span className={"blue"}>{replies.length}</span>
                        </h3>
                    </div>
                    {
                        replies.map((item, index) => {
                            if (!userHead) {userHead = defaultImg;}
                            return <div className={"bg-white mb10"} key={index} style={{borderBottom:"1px solid #f3f3f3"}}>
                                <div className={"rel ovh"} style={!item.isOpen?{maxHeight:"1.5rem"}:{}} onClick={()=>{this.addOpen(index)}}>
                                    {
                                        !item.isOpen &&  <div className={"abs t100 l0 r0 w100p fil"}>
                                            <div>
                                                <div className={"blue df aic jcc"}>
                                                    <span>展开全文</span>
                                                     <Icon type={"down"} size={"xs"}/>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="c6 bg-grey-light rel p10">
                                        {item.content}
                                    </div>
                                </div>
                                <div className="df jcb aic bg-white pt10 pb10">
                                    <div className="df aic">
                                        <div className="mr5">
                                            <img src={userHead} alt="" className="bdrs50p" style={{width: "0.32rem", height: "0.32rem"}}/>
                                        </div>
                                        <div><p className="fz12">{item.username}</p><p
                                            className="fz10 grey">{item.createTime.split(" ")[0]} 回复</p></div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </Layout>
        );
    }
}
