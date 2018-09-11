import React from 'react'
import { connect } from 'react-redux'

import OperationButton from '$components/buttons/operation-button'
import CategoryFilter from '../category-filter'
import LabelFilter from '../label-filter'
import StateFilter from '../state-filter'
import FilterBar from '../filter-bar'

import { addArticle } from '$actions/articles'

const FilterBar = ({ add }) => (
  <FilterBar type="top">
    <OperationButton
      title="添加文章"
      onClick={add}
    />
    <LabelFilter />
    <CategoryFilter />
    <StateFilter />
  </FilterBar>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  add: () => {
    dispatch(addArticle())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar)
