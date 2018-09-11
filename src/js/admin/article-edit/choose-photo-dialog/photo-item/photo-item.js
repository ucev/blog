import React from 'react'

import { getImageUrl } from '$actions/article-edit'

import './photo-item.style.scss'

class PhotoItem extends React.Component {
  constructor (props) {
    super(props)
    this.choose = this.choose.bind(this)
  }
  choose () {
    this.props.confirm(getImageUrl(this.props.imgsrc))
  }
  imgOnLoad (e) {
    var img = e
    var src = e.src
    var newimg = new Image()
    newimg.onload = function () {
      var w = newimg.width
      var h = newimg.height
      var small = w < h ? w : h
      var scale = small / 150
      var nw = w / scale
      var nh = h / scale
      img.setAttribute('width', nw + 'px')
      img.setAttribute('height', nh + 'px')
    }
    newimg.src = src
  }
  render () {
    var imgUrl = getImageUrl(this.props.imgsrc)
    return (
      <li className="choose-photo-div-photo-item-li" onClick={this.choose}>
        <img
          className="choose-photo-div-photo-item-img"
          width="150"
          height="150"
          src={imgUrl}
          alt="图片"
          onLoad={this.imgOnLoad}
        />
      </li>
    )
  }
}

export default PhotoItem
