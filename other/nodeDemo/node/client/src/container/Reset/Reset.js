/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import { NavBar, InputItem,Button,WhiteSpace,Toast } from 'antd-mobile';
import history from "../../utils/history"
import FooterSmall from "../../components/FooterSmall/FooterSmall";
import {checkPhone,removeBlank,getCompanyPY,checkPassword,scrollToBottom} from "../../utils/common"
import {getCompanyInfo,getLogin,getAffirm,getAuthCode} from "../../api/api"
import md5 from "md5"
import  "./Reset.css"

export default class Reset extends Component {
     state = {
      companyName:"",
      companyLogo:"",
      companyManager:"",
      hasError: false,
      hasError2: false,
      phone: '',
      password:"",
      startCount:true,  //是否开始倒计时
      lastTime:60,
      errorInfo:null,
      authCode:"",  //验证码
      isAffirm:true, //是否能点击
      passwordInfo:false
    };
    //开始倒计时
    getCheckCode=()=>{
        let {lastTime,phone}=this.state;
        //删除空格
        phone=removeBlank(phone)

        //手机号不正确直接返回
        if(!phone){
          Toast.info("手机号不能为空",2);
          this.setState({
            hasError:true
          })
          return;
        }
        //判断手机是否正确
      else if(!checkPhone(phone)){
        Toast.info("手机号格式不正确",2)
        this.setState({
          hasError:true
        })
        return
      }
        //发送验证码
        getAuthCode({phone:phone,keyword:"forget"},(result)=>{
          //成功开始倒计时
          this.setState({
            startCount:false
          })
          //开始倒计时
          let timer=setInterval(()=>{
            if(lastTime<=0){
              clearInterval(timer);
              this.setState({
                startCount:true,
                lastTime:60
              })
              return false;
            }
            else{
              this.setState({
                lastTime: --lastTime
              })
            }
          },1000)
        },(msg)=>{
          //失败重新发送
          this.setState({
            startCount:true,
            lastTime:60
          })
        });
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please e,3nter 11 digits');
        }
    }
  onChange = (phone) => {
    this.setState({
      phone,
      hasError:false
    });
  }
    onChange2 = (password) => {
      //输入的内容符号规则才能输入
      if(checkPassword(password) || password===""){
        this.setState({
            password
        });
      }
      this.setState({
        hasError2:false
      });
    }
    login=()=>{
        //向后台提交数据
        let {phone,password}=this.state;
        let params={
            phone:removeBlank(phone),
            password:md5(password)
        }
        getLogin(params,()=>{
            history.push("/");
        });
    }
    changeComponyInfo=(result)=>{
        let {companyName,companyLogo,companyManager,token}=result.result;
        this.setState({
            companyName,
            companyLogo,
            companyManager
        })
        //把获取的信息放在localsession里面
        localStorage.setItem({
            token
        },(()=>{
            //登录成功后开始跳转路由
            history.push("/");
        }))
    }
    //确认提交
    affirm=()=>{
        let {phone,authCode,password}=this.state;
        //提示错误
        //手机号格式不正确
        if(!checkPhone(phone) || !phone){
            Toast.info("手机号格式不正确",2,null,false)
            return;
        }
        //验证码不能为空
        if(!authCode || authCode.length!==4){
            Toast.info("验证码不正确",2,null,false)
            return;
        }
        //密码不能为空
        if(!password){
            Toast.info("密码不能为空",2,null,false);
              return;
        }
        if(password.length<6 || password.length>16){
          Toast.info("密码长度要6-16位",2,null,false);
            return;
        }
        this.setState({
            isAffirm:false
        })
        let params={
            phone:removeBlank(phone),
            code:authCode,
            newPwd:md5(password)
        }
        Toast.loading("加载中...",0)
        getAffirm(params,(result)=>{
          Toast.hide();
          Toast.success("修改成功",3,()=>{
            history.push("/");
          });
          this.setState({
            isAffirm:true
          })
        },(msg)=>{
          Toast.fail(msg);
          this.setState({
            isAffirm:true
          })
        });

    }
    onChangeAuthCode(value){
        this.setState({
            authCode:value
        })
    }
    componentWillMount(){
      let companyPY=getCompanyPY();
      getCompanyInfo({pinyin:companyPY},(result)=>{
        let {companyName,logo,contactName}=result;
        this.setState({
          companyName:companyName,
          companyLogo:logo,
          companyManager:contactName
        })
      });
    }
    blueFocus=()=>{
        this.setState({
            passwordInfo:false
        })
    }
    getFocus=()=>{
        this.setState({
            passwordInfo:true
        })
    }
    componentDidMount(){
      let phone=sessionStorage.getItem("paramPhone");
      this.setState({
        phone
      })
      sessionStorage.removeItem("paramPhone");
    }
    render() {
        // let {} = this.props;
        let{companyManager,passwordInfo}=this.state;
        let {getCheckCode,affirm}=this;
        return (
            <div>
                <NavBar
                    mode="light"
                    // icon={<Icon type="left" />}
                    // onLeftClick={() => window.history.back()}
                    style={{borderBottom:"1px solid #eee"}}
                >找回密码</NavBar>

                <div className="p20 mt40">
                    <WhiteSpace/>
                    <div id={"inputFirst"}>
                        <InputItem
                            type="phone"
                            placeholder="请输入手机号码"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            onChange={this.onChange}
                            value={this.state.phone}
                            onClick={this.blueFocus}
                            onFocus={scrollToBottom}
                        />
                        <WhiteSpace/>
                        <div className="rel">
                            <InputItem
                                maxLength={4}
                                placeholder="请输入4位短信验证码"
                                // error={this.state.hasError2}
                                onErrorClick={this.onErrorClick}
                                onChange={(value)=>{this.onChangeAuthCode(value)}}
                                value={this.state.authCode}
                                onClick={this.blueFocus}
                                onFocus={scrollToBottom}
                            />
                            {
                                this.state.startCount? <Button type="ghost" inline size="small" className="r0 btn1" style={{"position":"absolute"}} onClick={getCheckCode}>发送验证码</Button>
                                    :<Button type="ghost" inline size="small" className="r0 btn1" style={{"position":"absolute"}}>{this.state.lastTime}s</Button>
                            }
                        </div>
                        <WhiteSpace/>
                          <InputItem
                              type="password"
                              placeholder="请设置新的登陆密码"
                              error={this.state.hasError2}
                              onErrorClick={this.onErrorClick}
                              onChange={this.onChange2}
                              value={this.state.password}
                              style={{paddingBottom:"8px"}}
                              rel="passwordInput"
                              onClick={this.getFocus}
                              onFocus={scrollToBottom}
                          />
                        <div className={"mt5"}></div>
                        {
                            !passwordInfo?null:(<p style={{paddingLeft:"15px",color:"#ff5b06"}}>
                                *请设置6-16位，英文或数字组合的密码
                            </p>)
                        }
                    </div>
                    <div>
                        <WhiteSpace size="lg"/>
                        {this.state.isAffirm? <Button type="primary" onClick={affirm}>确认</Button>:<Button type="primary"  disabled>确认</Button>}
                        <p></p>
                        <p className="tac c3 mt10">企业管理员：{companyManager}</p>
                    </div>
                </div>
              <div style={{marginTop:"2.35rem"}}>
                {FooterSmall()}
              </div>
            </div>
        );
    }
}
