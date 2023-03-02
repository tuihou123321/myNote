/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import {Toast,List,TextareaItem,Button, ImagePicker } from 'antd-mobile';
import Layout from "../../layout/Layout"
import {messagePush,getMyMessageLists} from "../../api/api"
import { createForm } from 'rc-form';
import TabsLists from "../../components/TabsLists/TabsLists"
import "./Message.css"
import ViewImages from "./components/ViewImages"
import {labels} from "../../enums/enums"
import imgReady from "../../utils/getImageRealWidthH"

 class Message extends Component {
   state = {
       tabs:labels,
       psyLists:[],
       loading:true,
       selectName:"",
       title:"",
       content:"",
       myMsgTotal:0,
       files: [],
       multiple: true,
       maxSelectImageNumber:6,
       isOpen:false,
       ViewImagesIndex:0,
       buttonLoading:false
    };
   selectError={
     selectName:"请选择标签",
     title:"标题不能为空",
     content:"内容不能为空",
   }
   onChange = (files, type, index) => {
     //最多选择
     files=files.slice(0,this.state.maxSelectImageNumber);
     this.setState({
       files,
     });
   }
   onSegChange = (e) => {
     const index = e.nativeEvent.selectedSegmentIndex;
     this.setState({
       multiple: index === 1,
     });
   }
    componentDidMount=()=>{
        Toast.loading("加载中",0)
        getMyMessageLists(null,(result)=>{
            let {totalCount}=result;
            this.setState({
                myMsgTotal:totalCount*1
            })
            Toast.hide();
        })
    }
     submitFun=()=>{
        let {selectName,title,content,myMsgTotal,files=[]}=this.state;
        let {selectError}=this;
        for (let key in selectError){
          if(!this.state[key]){
              Toast.info(selectError[key]);
              return;
          }
        }
       let params={
            tag:selectName,
            title,
            content,
            images:files.map(item=>item.url)
        }
        Toast.loading("留言提交中",0);
        this.setState({
          buttonLoading:true
         })
         messagePush(params,(result)=>{
            localStorage.removeItem("Message");
             Toast.hide();
             Toast.info("留言成功，我们将于3个工作日内为您解答",3,()=>{
               window.h.push("Message/Record");
             });
        })
         this.setState({
             myMsgTotal:myMsgTotal+1,
             buttonLoading:false
         })
    }
   onImageClickFun=(index,fs)=>{
     this.setState({
       ViewImagesIndex:index,
       isOpen:true
      })
    }
   changeSelectId=(id)=>{
       this.setState({selectName:id})
   }
   addParams=(files)=>{
     files.length>0 && files.forEach(item=>{
       item.src=item.url;
       //本地图片好操作
       imgReady(item.src, function () {
         let {width,height}=this;
         item.w=width;
         item.h=height;
       });
     });
     return files;
    }
   handleClose = () => {
     this.setState({
       isOpen:false
     })
   };
    render() {
        let {title,selectName,myMsgTotal,tabs,files,maxSelectImageNumber,isOpen,ViewImagesIndex,buttonLoading}=this.state;
        return (
          <Layout right={<span className={"fz14"}
                               onClick={() => window.h.push("/Message/Record")}>我的留言({myMsgTotal})</span>}
                  url={"/PsyServer"} title={"心事留言"} FooterBottom={<div className={"h50"}/>}>
             <ViewImages isOpen={isOpen} items={this.addParams(files)} handleClose={this.handleClose} index={ViewImagesIndex}/>
             <div className={"msg ptb20 p15 bg-white"}>
                  <TabsLists title={"请选择您要咨询的问题标签"}  {...{tabs, selectName}}
                             changeSelectId={(id) => this.changeSelectId(id)}/>
                  <div className={"mb20"}>
                    <List>
                      <TextareaItem
                        rows={1}
                        count={20}
                        placeholder={"请输入留言标题(20个字符以内)"}
                        value={title}
                        onChange={(value) => this.setState({title: value})}
                      />
                    </List>
                  </div>
                  <div className={"mb15"}>
                    <List>
                      <TextareaItem
                        rows={5}
                        count={500}
                        placeholder={"请详细描述您要咨询的问题，有利于咨询师更好的答复"}
                        onChange={(value) => this.setState({content: value})}
                      />
                    </List>
                  </div>
                  <ImagePicker
                      files={files}
                      onChange={this.onChange}
                      onImageClick={(index, fs) => this.onImageClickFun(index, fs)}
                      selectable={files.length < maxSelectImageNumber}
                      multiple={this.state.multiple}

                    />
                  <p className={"fz10 grey mb30"}>
                    留言成功后，我们将在3个工作日内为您解答
                  </p>
                  <div className={"fixBottonWrap"}>
                    <Button type={"primary"} loading={buttonLoading} onClick={this.submitFun}>提交</Button>
                  </div>
              </div>
          </Layout>
        );
    }
}

const TextareaItemExampleWrapper = createForm()(Message);

export default TextareaItemExampleWrapper
