/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import Footer from "../Footer/Footer";
import LoadingBox from "./LoadingBox"


export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let {isLoading,Lists,total}=this.props;
           return (
            <div>
              <div>
                {
                  isLoading ? (
                    <LoadingBox/>
                  ) : Lists
                }
                <div>
                  {this.state.total===0 && <div className="w100p tac pt40 pb40 bg-white">暂无数据</div>}
                </div>
              </div>
                {Lists.length===total && Footer()}
            </div>
        );
    }
}
