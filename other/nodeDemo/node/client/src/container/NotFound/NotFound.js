/**
 * Created by mqd on 2018/6/3.
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom"
import Header from "../../components/Header/Header";

export default class NotFound extends Component {
    state = {
    }
    render() {
        let {history}=this.props;
        return (
            <div>
                <Header title="404" border="true" history={history}/>
                <div className="mt40 tac">
                    <p className="pb10">404未找到页面</p>
                    <Link to="/" className="active">返回首页</Link>
                </div>
            </div>
        );
    }
}
