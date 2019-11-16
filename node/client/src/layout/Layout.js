import React, {Component, Fragment} from 'react';
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import PropTypes from "prop-types"
import { setDocumentTitle } from "../static/js/public";


export default class Layout extends Component {
  static propTypes={
    title:PropTypes.string,
    children:PropTypes.node
  }
  state = {}
  //设置document title
  componentDidMount() {
    // setDocumentTitle();
  }
  render() {
    let {title,url,right,children,FooterBottom,noFooter}=this.props;
    return (
      <div>
        <Header {...{title,url,right}}/>
        {children}
        {!noFooter &&  <Fragment>
          <div className="blank"/>
          <Footer/>
        </Fragment>}
        {FooterBottom}
      </div>
    );
  }
}
