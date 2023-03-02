import React, { PureComponent, Fragment } from 'react';
import {Icon} from 'antd-mobile';
import classNames from "classname"
import {saveState} from "../../static/js/common"
import {loadImage} from "../../utils/common";
import BannerNavLists from "../BannerNavLists/BannerNavLists2"

let bannerNavData=[
  {
    attachment:"https://img.ydlcdn.com/file/2019/01/18/nu5ifuya0yv75cs0.jpg!s300x"
  },
  {
    attachment:"http://img1.imgtn.bdimg.com/it/u=1492301981,3610601880&fm=26&gp=0.jpg"
  },
  {
    attachment:"http://img1.imgtn.bdimg.com/it/u=1492301981,3610601880&fm=26&gp=0.jpg"
  }
]

export default class MessageTop extends PureComponent {
  state = {
  }
  goTo=(index,id)=>{
    //列表页
      if(this.props.removeRecord){
          saveState({...this.props});
          window.h.push(`/Message/Detail/${id}`)
      }
      //详情页
      else{
          this.props.addOpenTop(index);
      }
  }
  componentDidMount(){
  }
  render() {
      let {removeRecord,addQuestion,lists,moreAsks}=this.props;
      if(lists.length===0 || !lists){return false;}
      let spreadMore=(
        <div className={"abs t100 l0 r0 w100p fil mauto"}>
          <div className={"tac blue"}>
            <div className={"w80 dib"}>
              <div className={"df aic w100p"}>
                <span>展开全文</span>
                <Icon type={"down"} size={"xs"} className={"vam"}/>
              </div>
            </div>
          </div>
        </div>
      )

    let moreAsksFun=(moreAsks=[])=>(
      moreAsks.map((item,index)=>(
        <div className={"pr5 pl5 bg-white"} key={index}>
          <div className={"p10 rel"}>
            <span className={"fz10 bg-blue white abs w30 tac"}>追问</span>
            <div className={"c6 ti35 mb10"}>{item.content}</div>
            <div className={"fz10 c9"}>{item.createTime.split(" ")[0]} 发布</div>
          </div>
        </div>
      ))
    )

    return (
      <div>
          {
              lists.length>0 && lists.map((item,index)=>(
                    <div className={"pb10"} key={index}>
                      <div  onClick={()=>{this.goTo(index,item.id)}}>
                        <div className={"df aic jcb ptb20 plr10 bg-white"}>
                            <h4 className={"fz17 line1 fx1 mr20"}
                                style={{WebkitBoxOrient: "vertical"}}>{item.title}</h4>
                            <span className={"fz12 w70 orange"}>#{item.tag}#</span>
                        </div>
                        <div className={"p10"}>
                          {
                            item.images && item.images.length>0 && <div className={"mb10"}>
                              {addQuestion ? <div className={"w100p"}>
                                {
                                  item.images.map((itemImage,index)=>(
                                    <img src={itemImage.attachment} alt="" className={"mb5 w100p"} key={`itemImages${index}`}/>
                                  ))
                                }
                              </div> : <BannerNavLists data={item.images}/>
                              }
                            </div>
                          }
                          <div className={"fz14 ovh rel"} style={!item.isOpen?{maxHeight:"1.5rem"}:{}}>
                              <div className={classNames({c6:true, line3:removeRecord})}  style={{WebkitBoxOrient: "vertical"}}>
                                {item.content}
                                {addQuestion && !item.isOpen && spreadMore}
                              </div>
                              {moreAsks && moreAsksFun(moreAsks)}
                          </div>
                        </div>
                      </div>

                        <div className={"df jcb aic bg-white pt20 pb20 pr15 pl15"}>
                            <div className={"df aic"}>
                                <div className={"mr5"}>
                                     <img src={item.img ? item.img : loadImage("default.png")} alt="" style={{width:"0.32rem",height:"0.32rem"}} className={"bdrs50p"}/>
                                </div>
                                <div>
                                    <p className={"fz12"}>{item.username}</p>
                                    <p className={"fz10 grey"}>{item.createTime.split(" ")[0]} 发布</p>
                                </div>
                            </div>
                            <div className={"btn-wrap"}>
                                {
                                    removeRecord && (
                                        <Fragment>
                                          <span className={"btn btn-default btn2 mr20 grey"} onClick={()=>removeRecord(item.id,index)}>删除留言</span>
                                          <span className={"btn btn-red btn2 bg-blue white"} onClick={()=>this.goTo(index,item.id)}>查看回复</span>
                                        </Fragment>
                                    )
                                }
                                {addQuestion && <span className={"btn btn-blue btn2 bg-red white w50 tac grey-blue"} onClick={()=>addQuestion()}>追问</span>}
                            </div>
                        </div>
                    </div>
              ))
          }
      </div>
    );
  }
}
