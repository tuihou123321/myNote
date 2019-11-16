/* eslint arrow-body-style: 0 */
import React, { Component } from 'react';
import PlayVoice from "./PlayVoice"


export  default  class PlayVoiceBox extends Component {
  render() {
    let {listsDate,activeIndex,isPlaying,currentTime,totalTime,bufferedTime,currentUrl}=this.props;
    let {onChange,onAfterChange,startPlay,changeVideo,toggleStatus,onloadeddata,onplaying,onprogress,onloadstart,onpause,timeupdate,ended}=this.props;
    return (
          <div>
            <div className={"h200  bg-black fx jcc aic"}>
                <div className={"fx1 tac pt90"}><img src={require("../../static/images/voiceing.gif")} alt="" className={"w50"}/></div>
                <div className={"pt40"}><PlayVoice totalTime={totalTime} currentTime={currentTime} onChange={onChange} onAfterChange={onAfterChange} bufferedTime={bufferedTime}/></div>
                {currentUrl && <audio  id="audioPlay"  onCanPlay={startPlay} preload={"meta"} onLoadedData={onloadeddata} onPlaying={onplaying} onProgress={onprogress} onLoadStart={onloadstart} onPause={onpause} onTimeUpdate={timeupdate} onEnded={ended}>
                  <source src={currentUrl} type="audio/mpeg"/></audio>
                }
             </div>
            <div className="df p20 aic jcc">
                {
                  activeIndex>0?<img src={require("../../static/images/previous_nor@3X.png")} alt="" className={"w25"} onClick={()=>changeVideo(activeIndex-1)}/>
                    : <img src={require("../../static/images/previous_pre@3X.png")} alt="" className={"w25"}/>
                }
                <div className={"pl60 pr60"} onClick={()=>toggleStatus()}>
                  {!isPlaying?<img src={require("../../static/images/play@3X.png")} alt="" className={"w50"}/>:<img src={require("../../static/images/pause@3X.png")} alt="" className={"w50"}/>}
                </div>
                {
                  activeIndex+1<listsDate.length?<img src={require("../../static/images/next_nor@3X.png")} alt="" className={"w25"} onClick={()=>changeVideo(activeIndex+1)}/>
                    : <img src={require("../../static/images/next_pre@3X.png")} alt="" className={"w25"}/>
                }
            </div>
          </div>
    );
  }
}
