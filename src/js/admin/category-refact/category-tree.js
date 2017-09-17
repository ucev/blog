const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const CategoryItemLi = require('./category-item-li')

const CategoryTree = ({ article, category, cstate, tree }) => {
  return (
    <div id='refact-tree-area'>
      <ul className='category-tree-category-ul'>
        <CategoryItemLi category={tree} categoryId={category} articleId={article} cstate={cstate} depth={0} />
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

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTree)
