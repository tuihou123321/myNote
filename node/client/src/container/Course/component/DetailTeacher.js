/**
 * Created by mqd on ${DATE}.
 */
import React,{Fragment} from 'react';


export default function CourseDetailTeacher(hostInfo){
        if(!hostInfo || !hostInfo.name){return <div/>}
        return (
          <Fragment>
            <div className={"p15"}>
              <h1 className={"fz18 pb20"}>主讲专家</h1>
              <article className={"df bdb1 pb20"}>
                <div className="w80">
                  <img src={hostInfo.head} alt="" className={"h60 w60 bdrs50p"}/>
                </div>
                <div className={"fx1"} style={{minHeight:"0.8rem"}}>
                  <div className={"mb10 fz18"}>{hostInfo.name}</div>
                    {
                      (()=>{
                        if(hostInfo.tags){
                          return hostInfo.tags.split("|").map((item,index)=>{
                            return <span className={"bg-grey bdrs10 p5  pl10 pr10 mr5 mb5 c9 fl"} key={index}>{item}</span>
                          })
                        }
                      })()
                    }
                </div>
              </article>
              <article className={"df tac pb20 mt20"} style={{color:"#b2b2b2"}}>
                <div className="fx1">
                  <div className={"blue fz18 b"}>
                    {hostInfo.thksAmount}
                  </div>
                  <div>
                    收到感谢
                  </div>
                </div>
                <div className="fx1">
                  <div className={"blue fz18 b"}>
                    {hostInfo.cousultAmount}
                  </div>
                  <div>
                    人已咨询
                  </div>
                </div>
                <div className="fx1">
                  <div className={"blue fz18 b"}>
                    {hostInfo.fansAmount}
                  </div>
                  <div>
                    关注
                  </div>
                </div>
              </article>
            </div>
            <div className="blank"/>
          </Fragment>
        );
}
