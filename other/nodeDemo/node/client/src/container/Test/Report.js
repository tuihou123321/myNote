import React, {Component} from 'react';
import { ReportEchart16pf, ReportEchartRadar, ReportTable } from "./ReportComponent";
import Explain from "./ReportComponent/Explain";
import Layout from "../../layout/Layout";
import BannerLayout from "./ReportComponent/BannerLayout";
import classNames from "classname"
import HOC from "../../HOC/Test/Report"
import {Link} from  "react-router-dom"

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    let {desc, testResult, resultAnalyse,testPattern,name,bannerBase64,head120,nickName,resultUrl,modal1,head120Base64,sharePic,isScrolling,Echart16pfBase64
      ,ReportEchartRadarBase64} = this.props; //state
    let CommonResult=()=>(
      <div>
        <div className={"fz14 grey ti30"}>
          <div dangerouslySetInnerHTML={{__html: resultAnalyse}}/>
        </div>
      </div>
    )

    let Content=(isShare)=>(
      <div>
        <BannerLayout {...{name,sharePic,head120,bannerBase64,head120Base64,nickName,modal1,isShare}}/>
        <div className={classNames("t200","z100","w100p",{boxB:isShare,abs:isShare})} style={{top:"2.1rem"}}>
          <div className={"bg-white p20 pb0"} style={{minHeight:"1.2rem"}}>
            <div className={"pb10"}>
              <div className={"fz14 c3 b bdl2 grey pl5 mb10 lh15"}>结果分析</div>
              {testPattern===2 && <ReportTable testResult={testResult}/>}
              {testPattern===5 && (!isShare ? <ReportEchart16pf testResult={testResult}/>:<img src={Echart16pfBase64} alt="" className={"w100p"}/>)}
              {testPattern===6 && (!isShare ? <ReportEchartRadar testResult={testResult}/>:<img src={ReportEchartRadarBase64} alt="" className={"w100p"}/>)}
              {(testPattern!==2 && testPattern!==6 && testPattern!==5 && desc) &&  <h2 className={"fz18 c3"} dangerouslySetInnerHTML={{__html: desc}}/>}
              {(testPattern===5 && desc && !isShare) &&  <div  dangerouslySetInnerHTML={{__html: desc}}/>}
            </div>
            {resultAnalyse && <CommonResult/>}
          </div>
        </div>
      </div>
    )
    return (
      <Layout title="测试结果" className={"bg-grey"}>
        {resultUrl && <iframe src={resultUrl} height={"600px"} width={"100%"}  frameborder="0" seamless scrolling={isScrolling}/>}
        {!resultUrl && (
          <div className={"p10 pt20"}>
            {Content()}
            {testPattern === 6 && <Explain/>}
          </div>
        )}
      </Layout>
    );
  }
}

export default HOC(Report);
