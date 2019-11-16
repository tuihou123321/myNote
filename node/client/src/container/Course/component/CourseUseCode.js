import React, { Component } from 'react';
import { List, Modal, Picker, Toast } from 'antd-mobile';
import { selectCourseCouponList, getCourseBuy } from '../../../api/api';
import { getLastParam } from '../../../utils/common';
const Item = List.Item;
const prompt = Modal.prompt;

class CourseDtail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      courseId: props.courseId,
      couponSelect: [],
      SelectData: []
    };
  }
  onPressOk = () => {
    const { SelectData, courseId } = this.state;
    let postData = {
      id: courseId,
      code: SelectData[0],
    }
    console.log(postData)
    getCourseBuy(postData, (res) => {
      if (res) {
        Toast.success("报名成功！");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    });
    this.setState({ modal: false });
  }

  getAuthCoupon = () => {
    let id = getLastParam();
    let couponSelectArr = [];
    selectCourseCouponList({ courseId: id }, res => {
      res.forEach(ele => {
        let obj = {}
        obj["label"] = ele.code;
        obj["value"] = ele.code;
        couponSelectArr.push(obj);
      });
      this.setState({
        couponSelect: couponSelectArr,
      });
    })
  }

  componentDidMount() {
    this.getAuthCoupon();
    let id = getLastParam();
    this.setState({
      courseId: id
    })
  }
  jiaoyan = (val) => {
    if (val == "") {
      Toast.fail("请输入优惠码");
      return false;
    }
    let postData = {
      id: this.state.courseId,
      code: val,
    }
    getCourseBuy(postData, (res) => {
      // console.log(res, 555)
      if (res && res.code == 200) {
        Toast.success("报名成功！");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    });
  }
  openModal = (number) => {
    if (!number) {
      prompt('输入优惠码', '',
        [
          {
            text: '取消'
          },
          {
            text: '确定',
            onPress: value => this.jiaoyan(value)
          },
        ], 'default', null, [''])
    } else {
      this.setState({ modal: true })
    }
  }
  closeModal = () => {
    this.setState({
      modal: false,
      SelectData: []
    })
  }
  render() {
    let { SelectData, couponSelect } = this.state;
    const number = couponSelect.length;
    console.log(SelectData, 'couponSelect')
    return (
      <div className="course-code">
        {number != 0 ?
          <List onClick={() => this.openModal(number)}>
            <Item
              thumb="https://static.ydlcdn.com/user/images/icon_money.png"
              arrow="horizontal"
            >
              使用兑换券码(<span className="fc-orange">有{number}个兑换券码可用</span>)
          </Item>
          </List> :
          <List onClick={() => this.openModal(number)}>
            <Item
              thumb="https://static.ydlcdn.com/user/images/icon_money.png"
              arrow="horizontal"
            >
              使用兑换券码
          </Item>
          </List>
        }

        <Modal
          className="select-modal"
          title="选择优惠码"
          visible={this.state.modal}
          transparent
          onClose={() => this.closeModal()}
          footer={[
            { text: '取消', onPress: () => this.closeModal() },
            { text: '确定', onPress: this.onPressOk }
          ]}>
          <div>
            <div className="coupon-select">
              <Picker
                data={couponSelect}
                title="请选择兑换券码"
                extra=" "
                cols={1}
                value={SelectData}
                onChange={v => this.setState({ SelectData: v })}
                onOk={v => this.setState({ SelectData: v })}
                className="forss">
                <List.Item arrow="horizontal">请选择兑换券码</List.Item>
              </Picker>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CourseDtail;
