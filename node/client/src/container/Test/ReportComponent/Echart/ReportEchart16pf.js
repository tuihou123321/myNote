import React, {Component} from 'react';
import echarts from "echarts"
import {echart16pfEnums,tableTitle16pf} from "./enums/enums"
import ReportTable from "./ReportTable";


let testResult2= [
  {
    name: "A乐群性",
    number: 10,
    originScore: 9,
    score: 3  //实际得分
  },
  {
    name: "B实验性",
    number: 10,
    originScore: 10,
    score: 4
  },
  {
    name: "C实验性2",
    number: 10,
    originScore: 10,
    score: 0
  }
]

// let leftLabels2 = ["A|缄默孤独","B|迟钝浅薄","C|情绪激动"];
// let rightLabel2 = ["乐群外向","聪慧博学","情绪稳定"];
// let scores2 = [5,5,8];

export default class ReportEchart16pf extends Component {
  state = {
    tableTitle16pf
    // testResult:testResult2
  }
  //改变数据解构
  changeData=()=>{
    let leftLabels = [];
    let rightLabel = [];
    let scores = [];
    let {testResult}=this.props;
    let score;
    if(testResult !== []){
      for (let i in testResult){
        echart16pfEnums.forEach(item=>{
          if(i === item.key){
            score=(testResult[i] && testResult[i].score) || 0;
            scores.push(score);
            leftLabels.push(item.name[0]);
            rightLabel.push(item.name[1]);
          }
        })
      }
    }
    return {
      leftLabels,
      rightLabel,
      scores
    };
  }
  getReportTableFun=()=>{
    let {testResult}=this.props;
    tableTitle16pf.forEach((item,index)=>{
      for (let i in testResult){
        if(item.key===i){
          item.score=(testResult[i] && testResult[i].score) || 0;
        }
      }
    })
    this.setState({
      tableTitle16pf
     })
  }
  componentDidMount() {
    //转化表格要的数据；
    this.getReportTableFun();
    // // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('result_chart'));
    let {leftLabels,rightLabel,scores}=this.changeData();
    console.log(this.changeData());

    // 指定图表的配置项和数据
    let option = {
      title: {
        show: true,
        text: '你的测试结果',
        textStyle: {
          align: 'center',
          fontSize: '14',
          color: '#ffffff'
        }
      },
      legend: {
        show: false
      },
      grid: {
        x: 74,
        x2: 56
      },
      yAxis: [{
        type: 'category',
        data: leftLabels,
        position: 'left',
        boundaryGap: false,
        inverse: true,
        axisLabel: {
          show: true,
          interval: 0
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#94dc51'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        }
      }, {
        type: 'category',
        data: rightLabel,
        position: 'right',
        boundaryGap: false,
        inverse: true,
        axisLabel: {
          show: true,
          interval: 0
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#9be452'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        }
      }],
      xAxis: [{
        type: 'value',
        min: 0,
        max: 10,
        interval: 1,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#9be452'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        }
      }],
      series: [{
        data: scores,
        type: 'line',
        markLine: {
          symbolSize: 0,
          label: {
            show: false
          },
          lineStyle: {
            type: 'solid',
            color: '#317fff'
          },
          data: [
            {xAxis: 3},
            {xAxis: 7}
          ]
        }
      }, {
        type:  'line'
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  render() {
    let {tableTitle16pf}=this.state;
    return (
      <div className={"bg-green2 p5 pr0 ml0 mr10 mb10 bdrs10 bdrb0 w100p"} id={"result_chart2"}>
        <div id={"result_chart"} style={{width:"90%",height:"600px"}} className={"mauto p10"}/>
        <ReportTable testResult={tableTitle16pf} className={"white"}/>
      </div>
    );
  }
}
