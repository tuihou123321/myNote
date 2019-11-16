import React, {Component} from 'react';
import classNames from "classname"
import PropTypes from "prop-types"

export default class ItemWrap extends Component {
  state = {}
  static propTypes={
    smallTitle:PropTypes.string.isRequired,
    leftTitle:PropTypes.string,
    children:PropTypes.node,
    exchange:PropTypes.func
  }
  componentDidMount() {
  }
  exchange=()=>{
    let {url,exchange}=this.props;
    if(url){
      window.h.push(url);
    }
    if(exchange){
      exchange();
    }
  }
  render() {
    let {smallTitle,leftTitle,children,noBottom}=this.props;
    return (
      <div>
        <section className={"plr15 ptb20"}>
          <div className={classNames("df jcc jcb aie",{pb20:!noBottom})}>
            <h3 className={"fz24 c2"}>{smallTitle}</h3>
            <a href={"javascript:void(0)"} onClick={this.exchange} className={"c8"}>{leftTitle}</a>
          </div>
          <div>
            {children}
          </div>
        </section>
      </div>
    );
  }
}
