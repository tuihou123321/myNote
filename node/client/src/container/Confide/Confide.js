/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import LoadMoreWrap from "../../components/LoadMoreWrap/LoadMoreWrap"
import {getConfideLists,getConfideCategories} from "../../api/api"
import ConfideLists from "../../components/ConfideLists/ConfideLists"


export default class Test extends Component {
  state = {
  };
  componentDidMount(){
  }
  render() {
    return (
        <LoadMoreWrap
          getLists={getConfideLists}
          getCategories={getConfideCategories}
          title={"倾诉热线"}
          ListsComponentMap={ConfideLists}
        />
    );
  }
}
