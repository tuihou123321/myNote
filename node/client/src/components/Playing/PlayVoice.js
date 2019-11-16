/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import { Slider, WingBlank } from 'antd-mobile';
import {formatSeconds} from "../../utils/common";


export  default  class App extends Component {
  log = (name) => {
    return (value) => {
      console.log(`${name}: ${value}`);
    };
  }
  render() {
    let {currentTime,totalTime,onChange,onAfterChange,bufferedTime}=this.props;
    let currentTime2=formatSeconds(Math.floor(currentTime));
    let totalTime2=formatSeconds(Math.floor(totalTime))
    return (
      <div>
        <div className={"df aic white pl15 pr15"}>
             <div className={"w40"}>
               {currentTime2}
             </div>
            <div className={"fx1"}>
              <WingBlank size="lg">
                <Slider
                  style={{ marginLeft: 30, marginRight: 30 }}
                  defaultValue={currentTime}
                  value={currentTime}
                  min={0}
                  max={totalTime}
                  onChange={(a)=>{onChange(a)}}
                  onAfterChange={(a)=>{onAfterChange(a)}}
                />
              </WingBlank>
            </div>
            <div className={"w40"}>
              {totalTime2}
            </div>
        </div>
      </div>
    );
  }
}
