/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import LoadMoreWrap from "../../components/LoadMoreWrap/LoadMoreWrap"
import {getCourseList,getCourseCatelog} from "../../api/api"
import CourseLists from "../../components/CourseLists/CourseLists"


export default class Course extends Component {
  state = {
  };
  componentDidMount(){
  }
  render() {
    return (
      <LoadMoreWrap
        getLists={getCourseList}
        getCategories={getCourseCatelog}
        title={"心理课程"}
        ListsComponentMap={CourseLists}
        defaultTagIsFirst={true}
      />
    );
  }
}
