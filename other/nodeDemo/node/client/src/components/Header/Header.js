import React, { Component } from 'react';
import { Drawer, List, NavBar, Icon,Button } from 'antd-mobile';
import {NavLink} from "react-router-dom"
import classNames from "classname"
import "./RightNav.css"
import ReactSVG from "react-svg"
import {loadImage, stopDefault} from "../../utils/common"
import {navLists,navListsB} from "../../enums/enums"
import {exit} from "../../api/api"
import PropTypes from "prop-types"
import {goBack} from "../../static/js/public";


let navListsShow=navLists;

export default class Header extends Component {
  static propTypes={
    title: PropTypes.string,
    border:PropTypes.bool,
    bg: PropTypes.bool,
    // right:PropTypes.any,
    url:PropTypes.string
  }
  constructor(props, context) {
    super(props, context);
  }
  state = {
    open: false
  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }
  exit(ev){
    stopDefault(ev);
    exit({},()=>{
     localStorage.clear();
     window.h.push("/login");
    });
  }
  render() {
    let {title="",border,bg,right,url}=this.props;
    let {open}=this.state;
    let jcl="";
    if(title){
      jcl=title.length>12;
    }
    let hasActicle= localStorage.getItem("hasActicle");
    !hasActicle && (navListsShow=navListsB);

    const sidebar = (
      <div>
        <List renderHeader={() => <div className="db tar"><Icon type="cross" className="active fz18" onClick={this.onOpenChange}/></div>}>
          {
            navListsShow.map((item, index) => {
              return (
                <NavLink exact to={item.url}
                         className="db"
                         activeClassName="active"
                         key={index}
                >
                  <List.Item extra="" arrow="horizontal" onClick={() => {}}>{item.title}</List.Item>
                </NavLink>
              );
            })
          }
          {/*<NavLink exact to="/"*/}
                   {/*className="db"*/}
                   {/*activeClassName="active"*/}
          {/*>*/}
            {/*<List.Item extra="" arrow="horizontal" onClick={(ev)=>this.exit(ev)}>退出</List.Item>*/}
          {/*</NavLink>*/}
        </List>
        <div className="tac" style={{marginTop:"0.5rem"}}>
          <div>
            <Button type="ghost" style={{width:"2rem"}} className="dib" onClick={()=>{window.open("https://dat.zoosnet.net/LR/Chatpre.aspx?id=DAT83236505&cid=1526984497641643927573&lng=cn&sid=1528804057997664646634&p=http%3A//www.yidianling.com/ask/t1/&rf1=http%3A//www.yidianling&rf2=.com/ask/t1/p2&msg=&d=1528859512932")}}>
              联系客服
            </Button>
          </div>

          <div className={"tac"}>
            <a href={"javascript:void(0)"} className={"p15 grey fz18"} onClick={(ev)=>this.exit(ev)}>
              退出
            </a>
          </div>
        </div>
      </div>);

    let rightDefault=(img,right="")=>(
      <div className={classNames("df",{aic:right})}>
        <a href={"https://dat.zoosnet.net/LR/Chatpre.aspx?id=DAT83236505&amp;lng=cn"} className={"dib"} target={"_blank"}>
            <img src={loadImage(`icon_listen.png`)} alt="" className={"dib p15 wh23 cup"}/>
        </a>
        {
          right || <span onClick={this.onOpenChange} style={{paddingTop:"0.12rem"}} className={"dib"}>
            <ReactSVG
              path={loadImage(img)}
              // callback={svg => console.log(svg)}
              svgStyle={{ width: "0.3rem",height:"0.3rem",color:"#108ee9 !important",borderColor:"#108ee9" }}
              svgClassName=""
              className="example"
            />
         </span>
        }
      </div>
  )
    return (
      <div>
        <div style={{
          position:bg ? "absolute" : "fixed",
          zIndex: "100",
          width: "100%",
          top: "0",
        }}>
          {
            !bg ? <NavBar
              mode="light"
              icon={<Icon type="left" size="lg"/>}
              onLeftClick={()=>goBack(url)}
              rightContent={rightDefault(right ? "" : "nav.svg",right)}
              className={classNames({
                bdb1: border,
                jcl:jcl
              })}
            >{title}</NavBar> : <NavBar
              mode="light"
              icon={<Icon type="left" className="white" size="lg"/>}
              onLeftClick={()=>goBack(url)}
              rightContent={rightDefault(right ? "" : "nav2.svg",right)}
              style={{background:"none",color:"white"}}
              className={classNames("white",{
                bdb1: border,
                jcl:jcl
              })}
            ><span className="white">{title}</span></NavBar>
          }
          {
            open && (
              <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle={true}
                // docked="true"
                position="right"
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar={sidebar}
                open={open}
                onOpenChange={this.onOpenChange}
              >
                .
              </Drawer>
            )
          }
        </div>
        {
          !bg && <div className={"h45"}/>
        }
      </div>
    );
  }
}
