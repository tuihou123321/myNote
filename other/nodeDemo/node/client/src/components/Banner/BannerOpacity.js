import React, {Component} from 'react';
import PropTypes from "prop-types"
import {loadImage} from "../../utils/common";

export default class BannerOpacity extends Component {
  static propTypes={
    head:PropTypes.string
  }
  static defaultProps={
    head:loadImage("head2.jpg")
  }
  state = {}
  componentDidMount() {
  }

  render() {
    let {children,head}=this.props;
    return (
        <div className={"bg-black rel"}>
          <div className={"op7"}>
            <div  style={{
              backgroundImage: `url("${head}")`,
              backgroundRepeat:"no-repeat",
              width: "100%",
              height: "3rem",
              backgroundSize:"cover"
            }}/>
          </div>
          {children}
        </div>
    );
  }
}
