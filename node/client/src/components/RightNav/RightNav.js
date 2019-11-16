/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import {Drawer} from 'antd-mobile';
import "./RightNav.css"


export class RightNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }
    render() {
        let {isOpen,history}=this.props;
        let sidebar=(
            <div>7777</div>
        )
        let data=[
            {
                name:"首页",
                url:"/"
            },
            {
                name:"电话倾诉",
                url:"/confide"
            },
            {
                name:"心理课程",
                url:"/CourseLists "
            },
            {
                name:"心理测试",
                url:"/ceshi "
            },  {
            name:"心理资讯",
            url:"/Psy"
          },  {
                name:"个人中心",
                url:"/user"
            }
        ]
        return (
            <div>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange} />
            </div>
        );
    }
}
