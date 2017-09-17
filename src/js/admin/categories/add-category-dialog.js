const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const Dialog = require('../../components/dialogs/add_category_dialog')
import {
  addCategoryConfirm,
  addCategoryCancel,
  addCategoryValueChange
} from '../../redux/actions/categories'

const ADD_TITLE = {
  add: '添加类别',
  modify: '修改类别'
}

const AddCategoryDialog = ({ categories, data, type, visible, confirm, cancel, change}) => {
  return (<Dialog type = {type} title = {ADD_TITLE[type]} data = {data} categories = {categories} visible = {visible} confirm = {confirm} cancel = {cancel} valueChange = {change} />)
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  data: state.addData,
  type: state.addType,
  visible: state.addVisible,
})

const mapDispatchToProps = (dispatch) => ({
  confirm: (data) => {
    dispatch(addCategoryConfirm(data))
  },
  cancel: () => {
    dispatch(addCategoryCancel())
  },
  change: (data) => {
    dispatch(addCategoryValueChange(data))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryDialog)
