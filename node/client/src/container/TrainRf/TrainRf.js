/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { Toast,List,Button,InputItem, WhiteSpace, Calendar } from 'antd-mobile';
import Layout from "../../layout/Layout"
import {addTrainRf} from "../../api/api"
import { createForm } from 'rc-form';
import classNames from "classname"
import "./FaceRf.css"
import {changeWeekDay, checkPhone, removeBlank} from "../../static/js/common"
import {labels} from "../../enums/enums"

const now = new Date();

 class TrainRf extends Component {
   state = {
       tabs:labels,
       psyLists:[],
       loading:true,
       title:"",
       content:"",
       myMsgTotal:0,
       date:"",
       isCanSubmit:false,
    };
    componentDidMount=()=>{
    }
     onSubmit = () => {
         this.props.form.validateFields({ force: true }, (error) => {
             let {companyName,contactName,phone}=this.props.form.getFieldsValue();
             let {startTime}=this.state;
             if(!contactName || !companyName || !phone || !startTime){Toast.info("请填写完整");return;}
             if(!checkPhone(phone)){Toast.info("手机号格式不正确");return;}
             let  trainTime="";
             let amPm=1;
             if(startTime){
                 let date=startTime;
                 if(date.getHours()>12){amPm=2}
                 trainTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
             }
             let params={
                 contactName,
                 company:companyName,
                 phone:removeBlank(phone),
                 trainTime,
                 amPm
             }
             Toast.loading("加载中",0);
             addTrainRf(params,()=>{
                 Toast.hide();
                 Toast.info("预约成功，我们将于5个工作日内与您联系",3,()=>{
                   window.h.push("/TrainRf/Record");
                 });
             })
         });
     }
     onSelectHasDisableDate = (dates) => {
         console.warn('onSelectHasDisableDate', dates);
     }
     onConfirm = (startTime) => {
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
             show: false,
             startTime: undefined
         });
     }
     render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let showTime="";
        if(this.state.startTime){
            let date=this.state.startTime;
            let week=changeWeekDay(date.getDay());
            let isAM="上午";
            if(date.getHours()>12){
                isAM="下午"
            }
            showTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+week+" "+isAM;
        }
        else{
            showTime="";
        }
        return (
            <Layout right={<span onClick={()=>window.h.push("/TrainRf/Record")}>我的预约</span>} url={"/PsyServer"} title={"培训预约"}>
                <div className={"pt20 pb20 p10 bg-white"}>
                    <form>
                        <div className={"mb20"}>
                            <List>
                                <InputItem
                                    {...getFieldProps('companyName')}
                                    placeholder="单位名称"
                                    maxLength={40}
                                >单位名称：</InputItem>
                                <InputItem
                                    {...getFieldProps('contactName')}
                                    placeholder="请输入联系人姓名"
                                    maxLength={20}
                                >联系人姓名:</InputItem>

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
                            <p>预约成功后，我们将于5个工作日内与您联系</p>
                        </div>

                        <Button type={"primary"} loading={false} className={"mauto"} onClick={this.onSubmit}>提交</Button>
                    </form>
                </div>
            </Layout>
        );
    }
}

const TextareaItemExampleWrapper = createForm()(TrainRf);

export default TextareaItemExampleWrapper
