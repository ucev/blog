import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import CategoryItemLi from './category-item-li'

const CategoryTree = ({ article, category, cstate, tree }) => {
  return (
    <div id='refact-tree-area'>
      <ul className='category-tree-category-ul'>
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

const mapStateToProps = (state) => ({
  article: state.article,
  category: state.category,
  cstate: state.cstate,
  tree: state.tree
})

const mapDispatchToProps = (dispatch) => ({})

const _CategoryTree = connect(
                        mapStateToProps,
                        mapDispatchToProps
                      )(CategoryTree)
export default _CategoryTree
