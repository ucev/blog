const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const Dialog = require("../../components/dialogs/confirm_dialog.js")
import {
  deleteCategoryConfirm,
  deleteCategoryCancel
} from '../../redux/actions/categories'

const ConfirmDialog = ({ visible, confirm, cancel }) => {
  return (
    <Dialog title = '确认删除此类别?' visible = {visible} confirm = {confirm} cancel = {cancel} />
  )
}

const mapStateToProps = (state) => ({
  visible: state.delVisible
})

const mapDispatchToProps = (dispatch) => ({
  confirm: () => {
    dispatch(deleteCategoryConfirm())
  },
  cancel: () => {
    dispatch(deleteCategoryCancel())
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDialog)
