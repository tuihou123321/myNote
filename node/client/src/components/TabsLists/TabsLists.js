import React, { Component } from 'react';
import classNames from "classname"
import  PropTypes from "prop-types"


export default class TabsLists extends Component {
  constructor(props, context) {
    super(props, context);
  }
 static propTypes={
    title : PropTypes.string,
    tabs : PropTypes.array,
    changeSelectId : PropTypes.func,
    selectName : PropTypes.string,
 }
  state = {
  }
  shouldComponentUpdate(nextProps, nextState) {
    let isEqual = (nextProps.selectName===this.props.selectName);
    return !isEqual;
  }
  render() {
    let {title,tabs=[],changeSelectId,selectName}=this.props;
    return (
      <div>
          <h4 className={"mb10"}>{title}</h4>
          <div className={"df fxww jcb mb20"}>
              {
                  tabs.map((item,index)=>{
                      return <span  className={classNames("tabsItem cup",{
                          "tag-active":item.name===selectName,
                          "vh":item.id===null
                      })} style={{lineHeight:"0.32rem"}} key={index} onClick={()=>{changeSelectId(item.name)}}>{item.name}</span>
                  })
              }
          </div>
      </div>
    );
  }
}
