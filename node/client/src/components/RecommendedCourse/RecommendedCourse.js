/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { NavBar} from 'antd-mobile';
import "./RecommendedCourse.css"
import pic from "../../static/images/100.png"

export default class RecommendedCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let {coure,title,url}=this.props;
        return (
            <div>
                <div className="pt10">
                    <NavBar
                        mode="light"
                        leftContent={<span className="fz20 c3"><b>{title}</b></span>}
                        rightContent={<Link to={url} className="fz14 grey">更多</Link>}
                    />
                </div>
                <div className="p10 pt0">
                    <div className="lists bdb1-warp">
                        {
                            coure.map((item,index)=>{
                              if(!item.pic){
                                item.pic=pic;
                              }
                                return (
                                    <div className="pb20 pt20" key={index}>
                                        <Link to={`/course/detail/${item.id}?from=/`} className="w100p">
                                              <div className="mb10">
                                                 <img src={item.pic} alt="" className="w100p bdrs5"/>
                                              </div>
                                              <h3 className="mb5 line2" style={{WebkitBoxOrient: "vertical"}}>
                                              {item.title}
                                              </h3>
                                              <div className={"c9"}>
                                                <span className="mr10">讲师：{item.hostName}</span>
                                                <span>{item.readNums}人学过</span>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
