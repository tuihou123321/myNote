/**
 * Created by mqd on ${DATE}.
 */
import React, { Component } from 'react';
import {router,NavLink,Link} from "react-router-dom"

export default class PlayVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    let {url}=this.props;
    return (
      <div>
          <video width="100%" height="240" controls>
            <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4" />
          </video>
      </div>
    );
  }
}
