/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import LoadMoreWrap from "../../components/LoadMoreWrap/LoadMoreWrap"
import {getPsyLists,getPsyCategories} from "../../api/api"
import PsyLists from "../../components/PsyLists/PsyLists"


export default class PsyList extends Component {
  state = {
  };
  render() {
    return (
      <LoadMoreWrap
        getLists={getPsyLists}
        getCategories={getPsyCategories}
        title={"心理资讯"}
        ListsComponentMap={PsyLists}
        defaultTagIsFirst={true}
      />
    );
  }
}
