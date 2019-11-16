import React, {PureComponent} from 'react';
import { List, Checkbox } from 'antd-mobile';
import {loadImage} from "../../utils/common";
import PropTypes from "prop-types"
import { payLoadType } from "./enums/enums"

const CheckboxItem = Checkbox.CheckboxItem;



export default class PayType extends PureComponent {
  static propTypes = {
    payTypeId: PropTypes.number,
    changePayId: PropTypes.func,
    payLoadTypeFun: PropTypes.func,
  }
  state = {}
  componentDidMount() {
  }
  render() {
    let { payTypeId, changePayId, payLoadTypeFun } = this.props;
    return (
      <div>
        {
          payLoadType.map((item,index)=>(
            <List.Item key={`payLoadType${index}`} onClick={()=>payLoadTypeFun(item.id)} className={"rightZeroWrap"}>
              <div className={"dib w100"}>
                <div className={"df aic"}>
                  <img src={loadImage(item.img)} alt="" className={"w10 mr15"}/>
                  <span>{item.name}</span>
                </div>
              </div>
              <div className={"fr"}>
                <CheckboxItem  data-seed="logId" checked={item.id === payTypeId} onChange={(e) => {payLoadTypeFun(item.id) }}/>
              </div>
            </List.Item>
          ))
        }
      </div>
    )
  }
}
