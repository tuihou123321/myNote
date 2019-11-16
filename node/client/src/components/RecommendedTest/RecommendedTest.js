/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom"
import {NavBar} from 'antd-mobile';
import "./RecommendedTest.css"
import TestListsIndex from "../TestListsIndex/TestListsIndex"


export default class RecommendedTest extends Component {
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
                </div>

                <div className="pt0">
                    <div className="lists">
                      {
                        TestListsIndex(testData)
                      }
                    </div>
                </div>
            </div>
        );
    }
}
