import React from 'react';
import {Button} from "antd-mobile"

export default function ButtonX({type,children,disable,className,...other}){
  if(disable){
    return <Button type="default" className={`bdrs20 fz16 white bd0 ${className}`} style={{background:"#dbdbdb"}} {...other}>{children}</Button>
  }
  switch(type)
  {
      case "primary":
        return <Button type={"default"} className={`bgColorButton bdrs20 fz16 ${className}`} {...other}>{children}</Button>
      default:
        return <Button type={"default"} className={`blue bdrs20 fz16 ${className}`} style={{border:"1px solid #3d9eff"}} {...other}>{children}</Button>
  }
}
