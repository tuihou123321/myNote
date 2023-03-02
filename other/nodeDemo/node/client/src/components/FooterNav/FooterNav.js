import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import {navFooter} from "./enums/enums"


export default  class FooterNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      hidden: false
    };
  }
  renderContent(pageText) {
    return null;
  }
  isCurrentPath(){
    let pathname=this.props.history.location.pathname;
    this.setState({
      selectedTab:pathname
    })
  }
  componentDidMount(){
    this.isCurrentPath();
    let {history}=this.props;
    history.listen((location, action)=>{
        this.isCurrentPath();
    })
  }
  render() {
    let {history}=this.props;
    let {selectedTab}=this.state;
    return (
      <div>
        <div className={"fix b0 w100p bg-white z1 z3"}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            {
              navFooter.map((item,index)=>{
                 return  <TabBar.Item
                   key={index}
                   icon={{ uri: item.icon }}
                   selectedIcon={{ uri: item.selectedIcon }}
                   title={item.name}
                   selected={selectedTab === item.url}
                   onPress={() => {
                     this.setState({
                       selectedTab: item.url,
                     });
                     history.push(item.url)
                   }}
                 >
                   {this.renderContent(item.name)}
                 </TabBar.Item>
              })
            }
          </TabBar>
        </div>
        <div className={"h50"}/>
      </div>
    );
  }
}

