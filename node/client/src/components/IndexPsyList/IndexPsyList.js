/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import {NavBar} from 'antd-mobile';
import TestLists from "../TestListsIndex/TestListsIndex2"
import Nav from "../Nav/Nav"


export default class IndexPsyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let {testData,title,url}=this.props;
        return (
            <div>
                <div className="pt10">
                    <NavBar
                        mode="light"
                        leftContent={<span className="fz20 c3"><b>{title}</b></span>}
                        rightContent={<Link to={url} className="fz14 grey">更多</Link>}
                        style={{}}
                    />
                  <Nav tabs={this.state.tabs} getListsData={(id)=>this.getListsData(id)}/>

                </div>

                <div className="pt0">
                    <div className="lists">
                      {
                        TestLists(testData)
                      }
                    </div>
                </div>
            </div>
        );
    }
}
