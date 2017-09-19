import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import ConfirmDialog from "../../components/dialogs/confirm-dialog"
import {
  deleteArticleCancel,
  deleteArticleConfirm
} from '../../redux/actions/articles'

const ArticleDeleteDialog = ({ visible, deleteConfirm, deleteCancel }) => (
  <ConfirmDialog
    title = '确认删除?'
    confirm = {deleteConfirm}
    cancel = {deleteCancel}
    visible = {visible} />
)

const mapStateToProps = (state) => ({
  visible: state.delVisible
})

const mapDispatchToProps = (dispatch) => ({
  deleteCancel: () => {
    dispatch(deleteArticleCancel())
  },
  deleteConfirm: () => {
    dispatch(deleteArticleConfirm())
  },
})

const _ArticleDeleteDialog = connect(
                               mapStateToProps,
                               mapDispatchToProps
                              )(ArticleDeleteDialog)
export default _ArticleDeleteDialog
