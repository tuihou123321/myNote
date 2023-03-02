import React, {PureComponent} from 'react';
import {PhotoSwipeGallery} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import PropTypes from "prop-types"
import "./ViewImages.less"

let itemsDemo=[
  {
    src: 'http://lorempixel.com/1200/900/sports/1',
    w: 1200,
    h: 900,
    // title: 'Image 1'
  },
  {
    src: 'http://lorempixel.com/1200/900/sports/2',
    w: 1200,
    h: 900,
    // title: 'Image 2'
  }
]

export default class ViewImages extends PureComponent {
  static propTypes = {
    items:PropTypes.array,
    isOpen: PropTypes.bool,
    handleClose:PropTypes.func,
    options:PropTypes.object
  }
  state = {
    isOpen: true,
    items:itemsDemo
  }
  getThumbnailContent=(item)=>{
    return (
      <img src={item.src} width={90} height={60}/>
    );
  }
  componentDidMount() {
  }
  render() {
    let {options}=this.state;
    let {items,isOpen,handleClose}=this.props;
    console.log(items,2000);
    return (
      <div>
        <PhotoSwipeGallery isOpen={isOpen} items={items} options={options} onClose={handleClose} thumbnailContent={this.getThumbnailContent}/>
      </div>
    )
  }
}
