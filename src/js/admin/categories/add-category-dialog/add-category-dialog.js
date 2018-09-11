import React from 'react'
import { connect } from 'react-redux'

import Dialog from '$components/dialogs/add-category-dialog'
import {
  addCategoryConfirm,
  addCategoryCancel,
  addCategoryValueChange,
} from '$actions/categories'

const ADD_TITLE = {
  add: '添加类别',
  modify: '修改类别',
}

const AddCategoryDialog = ({
  categories,
  name,
  parent,
  descp,
  type,
  visible,
  confirm,
  cancel,
  change,
}) => {
  return (
    <Dialog
      type={type}
      title={ADD_TITLE[type]}
      name={name || ''}
      parent={parent || ''}
      descp={descp || ''}
      categories={categories}
      visible={visible}
      confirm={confirm}
      cancel={cancel}
      valueChange={change}
    />
  )
}

const mapStateToProps = state => ({
  categories: state.categories,
  name: state.addData.name || '',
  parent: state.addData.parent || '',
  descp: state.addData.descp || '',
  type: state.addType,
  visible: state.addVisible,
})

const mapDispatchToProps = dispatch => ({
  confirm: () => {
    dispatch(addCategoryConfirm())
  },
  cancel: () => {
    dispatch(addCategoryCancel())
  },
  change: data => {
    dispatch(addCategoryValueChange(data))
  },
})

const _AddCategoryDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryDialog)
export default _AddCategoryDialog
