import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import CategoryFilter from './category-filter'
import LabelFilter from './label-filter'
import StateFilter from './state-filter'

import {
  addArticle
} from '../../redux/actions/articles'

const FilterBar = ({ add }) => (
  <div className = 'table-filter-bar table-filter-bar-top'>
    <button className = 'operation-button' onClick = {add}>添加文章</button>
    <LabelFilter />
    <CategoryFilter />
    <StateFilter />
  </div>
)

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  add: () => {
    dispatch(addArticle())
  }
})

const _FilterBar = connect(
                     mapStateToProps,
                     mapDispatchToProps
                    )(FilterBar)
export default _FilterBar
