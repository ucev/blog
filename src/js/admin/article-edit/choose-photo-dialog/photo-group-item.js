import React from 'react'
import { connect } from 'react-redux'

import { photoGroupChange } from '$actions/article-edit'

// const PhotoGroupItem = ({current, gid, name, count, choose}) => (
class PhotoGroupItem extends React.Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }
  click() {
    this.props.choose(this.props.gid)
  }
  render() {
    var name = this.props.name
    var count = this.props.count
    var classes = 'choose-photo-div-photo-group-li'
    if (this.props.gid == this.props.currentGid) {
      classes += ' choose-photo-div-photo-group-li-current'
    }
    return (
      <li className={classes} onClick={this.click}>
        {name}({count})
      </li>
    )
  }
}

const mapStateToProps = state => ({
  currentGid: state.gid,
})

const mapDispatchToProps = dispatch => ({
  choose: gid => {
    dispatch(photoGroupChange(gid))
  },
})

const _PhotoGroupItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupItem)

export default _PhotoGroupItem
