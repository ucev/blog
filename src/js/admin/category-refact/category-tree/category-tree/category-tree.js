import React from 'react'
import { connect } from 'react-redux'

import CategoryItemList from '../category-item-list'

const CategoryTree = ({ /* cstate,*/ tree }) => {
  return (
    <div id="refact-tree-area">
      <CategoryItemList depth={0} childs={[tree]} cid={0} />
    </div>
  )
}

const mapStateToProps = state => ({
  // cstate: state.cstate,
  tree: state.tree,
})

const mapDispatchToProps = () => ({})

const _CategoryTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTree)
export default _CategoryTree
