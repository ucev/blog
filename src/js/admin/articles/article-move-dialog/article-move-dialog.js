import React from 'react'
import { connect } from 'react-redux'

import OptionDialog from '$components/dialogs/option-dialog'

import { moveCategoryCancel, moveCategoryConfirm } from '$actions/articles'

const ArticleMoveDialog = ({
  categories,
  visible,
  moveConfirm,
  moveCancel,
}) => (
  <OptionDialog
    title="移动文章分组"
    optionItems={categories}
    visible={visible}
    confirm={moveConfirm}
    cancel={moveCancel}
  />
)

const mapStateToProps = state => ({
  visible: state.moveVisible,
  categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
  moveCancel: () => {
    dispatch(moveCategoryCancel())
  },
  moveConfirm: gid => {
    dispatch(moveCategoryConfirm(gid))
  },
})

const _ArticleMoveDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleMoveDialog)
export default _ArticleMoveDialog
