import React from 'react'
import { connect } from 'react-redux'

import { deleteLabel } from '$actions/article-edit'

import './label.style.scss'

class Label extends React.Component {
  constructor (props) {
    super(props)
    this.delete = this.delete.bind(this)
  }
  delete () {
    this.props.delete(this.props.label)
  }
  render () {
    var labelExist = this.props.labelExist
    var label = this.props.label
    var nclass = labelExist.indexOf(label) == -1 ? 'new' : 'existed'
    var classes = `label-div label-div-label-${nclass}`
    return (
      <div className={classes}>
        <span>{label}</span>
        <img
          src="/images/icons/ic_clear_white_24dp_2x.png"
          onClick={this.delete}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  labelExist: state.labelExist,
})

const mapDispatchToProps = dispatch => ({
  delete: label => {
    dispatch(deleteLabel(label))
  },
})

const _Label = connect(
  mapStateToProps,
  mapDispatchToProps
)(Label)

export default _Label
