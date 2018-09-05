import React from 'react'
import { connect } from 'react-redux'

import CategoryItemLi from './category-item-li'

const CategoryTree = ({ cstate, tree }) => {
  return (
    <div id="refact-tree-area">
      <ul className="category-tree-category-ul">
        <CategoryItemLi
          id={tree.id}
          title={tree.title}
          childs={tree.childs}
          expanded={cstate[tree.id] !== false}
          depth={0}
        />
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  cstate: state.cstate,
  tree: state.tree,
})

const mapDispatchToProps = () => ({})

const _CategoryTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTree)
export default _CategoryTree
