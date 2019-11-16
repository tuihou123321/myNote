import React, {Component} from 'react';
import echarts from "echarts"

//雷达
let labels2 = [
  {name: '跪求型1', max:10,score: 10},
  {name: '跪求型2', max:10,score: 8},
  {name: '跪求型3', max:10,score: 6},
  {name: '跪求型4', max:10,score: 5},
  {name: '跪求型5', max:10,score:1},
];

export default class ReportEchartRadar extends Component {
  state = {}
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('result_chart3'));
    let labels=this.props.testResult;
    // let labels=labels2;
    let scores = [];
    //过滤出分数
    labels.forEach(item=>{
      scores.push(item.score);
    })
    let option = {
      title: {
        show: false
      },
      radar: {
        name: {
          color: '#2f2f2f',
        },
        nameGap: 0,
        axisTick: {
          show: true,
          length: 3
        },
        indicator: labels
      },
      series: [{
        type: 'radar',
        data: [{value: scores}]
      }]
    };
    myChart.setOption(option);
  }

  render() {
    return (
      <div className={"resultChart3"}>
        <div id={"result_chart3"} style={{width:"320px",height:"260px"}} className={"mauto"}/>
        <div className={"fz12 grey tac mb20"}>注：分数越高，表示在这方面越突出</div>
      </div>
    );
  }
}
