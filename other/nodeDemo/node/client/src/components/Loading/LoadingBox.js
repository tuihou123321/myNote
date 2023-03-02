import React from "react"
import { Icon }  from "antd-mobile"

export default function LoadingBox(){
  return <div className="tac pt20 pb20">
    <Icon type="loading" size="md"/>
    <p className="grey">加载中...</p>
  </div>
}
