import React from 'react'
import { connect } from 'react-redux'

import { addCategoryDivStateChange } from '$actions/categories'
import OperationConfirmButton from '$components/buttons/operation-confirm-button'

import './operation-bar.style.scss'

class OperationBar extends React.Component {
  constructor (props) {
    super(props)
    this.addNewCategory = this.addNewCategory.bind(this)
  }
  addNewCategory () {
    this.props.add()
  }
  render () {
    return (
      <div className="table-operation-bar table-operation-bar-top">
        <OperationConfirmButton
          title="新建类别"
          onClick={this.addNewCategory}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  add: () => {
    dispatch(addCategoryDivStateChange(true, 'add'))
  },
})

const _OperationBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationBar)
export default _OperationBar
