import React ,{ Component, Fragment } from "react"
import { Modal, List, Button, WhiteSpace, WingBlank,Icon,Toast } from 'antd-mobile';
import PayType from "./PayType";
import PropTypes from "prop-types"

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class Popup extends Component {
  static propTypes={
    showPopup: PropTypes.bool,  //显示显示popup
    Balance:PropTypes.number,  //企业余额
    applyFee:PropTypes.number,  //用户余额
    payTypeId:PropTypes.number, //默认支付方式
    startPay: PropTypes.func,
    hideModal: PropTypes.func,
    changePayType: PropTypes.func,
  }
  //保留二位小数，向上取整
  MathCeil=(value)=>{
      value=value.toFixed(2);
      return value;
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  render() {
    let {showPopup,hideModal,applyFee,Balance,payTypeId,maxCoupon}=this.props;
    let { MathCeil }= this;
    //计算属性
    let isEnought = maxCoupon ? ((Balance + maxCoupon - applyFee) >= 0) : ((Balance - applyFee) >= 0);
    return (
      <WingBlank>
        <WhiteSpace />
        <Modal
          popup
          visible={showPopup}
          onClose={hideModal}
          animationType="slide-up"
        >
          <List renderHeader={() => <div><span className={"abs l10"} onClick={hideModal}><Icon type={"cross"}/></span> <span className={"c3 fz16"}>确认支付</span></div>}>
            <List.Item>
              <span className={"pt10"}>付款金额</span>
              <div className={"fr "}>¥ <span style={{fontSize:"0.28rem"}}>{applyFee}</span></div>
            </List.Item>
            <List.Item>
              付款类型
              <div className={"fr "}>测评报名</div>
            </List.Item>
            <List.Item>
              使用余额
              <div className={"fr"}>- ¥{maxCoupon ? (maxCoupon>applyFee ? 0 : (applyFee-maxCoupon<Balance?parseFloat(applyFee-maxCoupon).toFixed(2):Balance)) : (Balance>applyFee?applyFee:Balance)}</div>
            </List.Item>
            <List.Item>
              红包
              <div className={"fr"}>- ¥{maxCoupon ? (maxCoupon>applyFee ? applyFee : maxCoupon) : 0}</div>
            </List.Item>

            <List.Item>
              还需支付
              <div className={"fr orange"}> ¥{isEnought ? 0 : maxCoupon ? MathCeil(applyFee-Balance-maxCoupon): MathCeil(applyFee-Balance)}</div>
            </List.Item>

            {
              !isEnought && <Fragment>
                  <div className={"fz10 grey bg-grey p5 tal pl15"}>选择支付方式</div>
                  <PayType payTypeId={payTypeId} payLoadTypeFun={(payTypeId)=>{this.props.changePayType(payTypeId)}}/>
                </Fragment>
            }

            <Button type="primary" onClick={this.props.startPay} className={"bdrs0_button"}>
              {
                isEnought ? <span className={"fz14"}>确认支付</span>
                  : <span><i className={"fz14 n"}>确认支付 &nbsp;&nbsp; ¥ </i>
                  {isEnought ? 0 : MathCeil(applyFee-Balance)}</span>
              }
              </Button>

          </List>
        </Modal>
      </WingBlank>

    );
  }
}

export default Popup;



