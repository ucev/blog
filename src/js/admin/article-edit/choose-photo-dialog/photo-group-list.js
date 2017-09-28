import React from 'react'
import { connect } from 'react-redux'

import PhotoGroupItem from './photo-group-item'

// const PhotoGroupList = ({ groups }) => {
class PhotoGroupList extends React.Component {
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
    var gps = this.props.groups.map((g) => (
      <PhotoGroupItem
        key = {g.id}
        gid = {g.id}
        name = {g.name}
        count = {g.count} />
    ))
    return (
      <ul
        id = "choose-photo-div-photo-group-ul"
        ref = {(list) => {this.list = list}}>
        {gps}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  groups: state.photoGroups
})

const mapDispatchToProps = () => ({})

const _PhotoGroupList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupList)

export default _PhotoGroupList
