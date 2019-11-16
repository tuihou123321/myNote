import React from 'react'
// import LoadingBox from "../Loading/LoadingBox"
import { Toast } from "antd-mobile"

export default function (getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        Toast.loading("加载中...",0)
        getComponent().then(({default: Component}) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
          Toast.hide();
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}
