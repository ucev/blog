import React from 'react'
import { connect } from 'react-redux'

import PhotoItem from './photo-item'

// const PhotoItemList = ({ photos, confirm }) => {
class PhotoItemList extends React.Component {
  componentDidMount () {
    this.list.addEventListener('scroll', this.listScroll)
  }
  componentWillUnmount () {
    this.list.removeEventListener('scroll', this.listScroll)
  }
  listScroll (e) {
    e.stopPropagation()
  }
  render () {
    var ps = this.props.photos.map(p => (
      <PhotoItem key={p.id} imgsrc={p.name} confirm={this.props.confirm} />
    ))
    return (
      <ul
        id="choose-photo-div-photo-list-ul"
        ref={list => {
          this.list = list
        }}>
        {ps}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  photos: state.photos,
})

const mapDispatchToProps = () => ({})

const _PhotoItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItemList)

export default _PhotoItemList
