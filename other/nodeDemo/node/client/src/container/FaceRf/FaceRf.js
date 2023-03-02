/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { Toast,List,Button,InputItem, WhiteSpace, Calendar } from 'antd-mobile';
import {faceRfPush} from "../../api/api"
import { createForm } from 'rc-form';
import classNames from "classname"
import TabsLists from "../../components/TabsLists/TabsLists"
import "./FaceRf.css"
import {changeWeekDay, checkPhone, removeBlank} from "../../static/js/common"
import {labels} from "../../enums/enums"
import {loadImage} from "../../utils/common";
import {setDocumentTitle} from "../../static/js/public";
import Layout from "../../layout/Layout"
import { sexLists } from "./enums/enums"

const now = new Date();



 class FaceRf extends Component {
   state = {
       tabs:labels,
       psyLists:[],
       loading:true,
       selectName:"",
       title:"",
       content:"",
       myMsgTotal:0,
       date:"",
       isCanSubmit:false,
       sex:1, //1男，2女
       buttonLoading:false
   };
     onSubmit = () => {
         this.props.form.validateFields({ force: true }, (error) => {
             let {startTime,selectName,sex}=this.state;
             let {name,age,phone}=this.props.form.getFieldsValue();
             if(!name || !age || !phone || !startTime){Toast.info("请填写完整");return;}
             if(!checkPhone(phone)){Toast.info("手机号格式不正确");return;}
             if(!selectName){Toast.info("请选择标签");return;}
             let  trainTime="";
             let amPm=1;
             if(startTime){
                 let date=startTime;
                 date.getHours()>12 && (amPm=2)
                 trainTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
             }
             let params={
                 consultName:name,
                 age,
                 amPm,
                 gender:sex,
                 phone:removeBlank(phone).toString(),  //去除空格
                 consultTime:trainTime.toString(),    //培训时间
                 tag:selectName  //标签
             }
             Toast.loading("加载中",0);
             this.setState({
               buttonLoading:true
              })
             faceRfPush(params,()=>{
               Toast.hide();
               this.setState({
                 buttonLoading:false
               })
                 Toast.info("预约成功，我们将于3个工作日内与您联系",3,()=>{
                    window.h.push("/FaceRf/Record");
                 });
             })
         });
     }
     onSelectHasDisableDate = (dates) => {
         console.warn('onSelectHasDisableDate', dates);
     }
     onConfirm = (startTime) => {
       console.log(startTime,3000);
         document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
         if(startTime){
             let week=startTime.getDay();
             if(week===0 || week===6){
                 Toast.info("工作时间：周一至周五");
                 return;
             }
         }
         this.setState({
             show: false,
             startTime
         });
     }
     onCancel = () => {
         document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
         this.setState({
             show: false
         });
     }
     changeSelectId=(id)=>{
         this.setState({selectName:id})
     }
     componentDidMount(){
       setDocumentTitle();
     }
     render() {
        let {selectName,tabs,sex,buttonLoading}=this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        let showTime="";
        if(this.state.startTime){
            let date=this.state.startTime;
            let week=changeWeekDay(date.getDay());
            let isAM=date.getHours()>12 ? "下午":"上午";
            //如果选择的时间是今天，并且已经大于12:00默认下午；
            let nowTime=new Date();
            let nowTimeFull=nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate();
            let showTimeFull=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            if(nowTimeFull===showTimeFull && nowTime.getHours()>=11){
                isAM="下午"
            }
            showTime=showTimeFull+" "+week+" "+isAM;
        }
        return (
          <Layout right={<span
                onClick={()=>window.h.push("/FaceRf/Record")}>我的预约</span>}
                url={"/PsyServer"}
                title={"心理咨询"}
                FooterBottom={<div className={"h50"}/>}>
                <div className={"ptb20 p10 bg-white"}>
                <TabsLists title={"请选择您要咨询的问题标签"}  {...{tabs,selectName}} changeSelectId={(id)=>this.changeSelectId(id)}/>
                    <form>
                        <div className={"mb20"}>
                            <List>
                                <InputItem
                                    {...getFieldProps('name')}
                                    placeholder="可只输入姓氏"
                                    maxLength={1}
                                >姓名：</InputItem>
                                <InputItem
                                    {...getFieldProps('age')}
                                    placeholder="请输入年龄"
                                    type="number"
                                    maxLength={3}
                                >年龄：</InputItem>

                                <InputItem
                                    {...getFieldProps('sex')}
                                >
                                    性别：
                                    <div className={"abs t0"} style={{left:"0.9rem"}}>
                                        <div className={"df fz14"}>
                                          {
                                            sexLists.map((item,index)=>{
                                                return <div className={classNames({mr30:index===0})} onClick={()=>this.setState({sex:item.type})} key={index}>
                                                  <img src={loadImage(sex===item.type ? "Group_3@3x.png" :"Oval@3x.png")} alt="" style={{width:"0.16rem",height:"0.16rem"}} className={"mr5"}/>
                                                  <span>{item.name}</span>
                                                </div>
                                            })
                                          }
                                        </div>
                                    </div>
                                </InputItem>

                                <InputItem
                                    {...getFieldProps('phone')}
                                    type={"phone"}
                                    placeholder="请输入手机号"
                                >手机号：</InputItem>
                                <div className="trainRf">
                                  <List.Item arrow="horizontal"
                                             className={classNames({blackBox:showTime})}
                                             extra={showTime?showTime:"请选择时间"}
                                             onClick={() => {
                                                 document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                                                 this.setState({
                                                     show: true,
                                                     config:{
                                                         pickTime:true
                                                     }
                                                 });
                                             }}
                                  >预约时间：
                                  </List.Item>
                                </div>
                            </List>
                            <WhiteSpace />
                        </div>
                        <Calendar
                            {...this.state.config}
                            visible={this.state.show}
                            onCancel={this.onCancel}
                            onConfirm={this.onConfirm}
                            onSelectHasDisableDate={this.onSelectHasDisableDate}
                            defaultDate={now}
                            minDate={new Date(+now - 0)}
                            maxDate={new Date(+now + 30*24*60*60*1000)}
                            type={"one"}
                        />
                        <div className={"fz10 grey mb30"}>
                            <p>工作时间：周一至周五</p>
                            <p>预约成功后，我们将于3个工作日内与您联系</p>
                        </div>
                      <div className={"fixBottonWrap"}>
                        <Button type={"primary"} loading={buttonLoading} onClick={this.onSubmit}>提交</Button>
                      </div>
                    </form>
                </div>
            </Layout>
        );
    }
}

const TextareaItemExampleWrapper = createForm()(FaceRf);

export default TextareaItemExampleWrapper
