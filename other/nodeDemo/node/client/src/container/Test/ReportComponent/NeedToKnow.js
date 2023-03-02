import React from 'react';
import PropTypes from "prop-types"

let propTypes = {}

function NeedToKnow() {
  return (
      <div className={"mb20"} style={{backgroundColor: "rgb(239, 239, 239)"}}>
        <h3 className={"pt15 tac"}>测评须知</h3>
        <div className={"c6 lh1-6p p15"}>
          <p><i className={"w15 h15 bg-grey2 bdrs50p dib lh15 tac white mr5 n"}>1</i>本测试为虚拟服务内容，购买成功后不可退换</p>
          <p><i className={"w15 h15 bg-grey2 bdrs50p dib lh15 tac white mr5 n"}>2</i>测试可重复购买，每次付费仅允许测试一次。</p>
          <p><i className={"w15 h15 bg-grey2 bdrs50p dib lh15 tac white mr5 n"}>3</i>测试完成后可以在“心理测试-我的”中随时查看报告。</p>
          <p><i className={"w15 h15 bg-grey2 bdrs50p dib lh15 tac white mr5 n"}>4</i>有任何疑问，可联系客服小壹协助处理。</p>
        </div>
      </div>
  );
}

NeedToKnow.propTypes = propTypes;
export default NeedToKnow;
