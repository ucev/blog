import React from 'react'
import { connect } from 'react-redux'

// import ArticleItemLi from '../article-item-li'
import CategoryItemList from '../category-item-list'

import { categoryExpandChange, getRefactDetail } from '$actions/category-refact'

import './category-item-li.style.scss'

class CategoryItemLi extends React.Component {
  constructor (props) {
    super(props)
    this.expandChange = this.expandChange.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }
  handleCategoryClick () {
    this.props.getDetail(this.props.id)
  }
  expandChange (e) {
    this.props.toggleExpandState(this.props.id)
    e.stopPropagation()
  }
  render () {
    let depth = this.props.depth
    var styles = {
      paddingLeft: depth * 20 + 20 + 'px',
    }
    var titleClass = 'category-tree-category-title'
    if (this.props.id == this.props.currCategory) {
      titleClass += ' category-tree-category-title-current'
    }
    var articlesUlStyle = {}
    var titleImage = '/images/icons/ic_expand_more_white_24dp_2x.png'
    if (this.props.expanded === false) {
      articlesUlStyle.display = 'none'
      titleImage = '/images/icons/ic_expand_less_white_24dp_2x.png'
    }
    return (
      <li className="category-tree-category-li">
        <div className="category-tree-category-title-div">
          <span
            className={titleClass}
            onClick={this.handleCategoryClick}
            style={styles}>
            {this.props.title}
          </span>
          <img
            className="category-tree-category-title-img"
            src={titleImage}
            onClick={this.expandChange}
          />
        </div>
        <CategoryItemList
          depth={this.props.depth + 1}
          childs={this.props.childs}
          style={articlesUlStyle}
          cid={this.props.id}
        />
      </li>
    )
  }
}

const mapStateToProps = state => ({
  currCategory: state.category,
  currArticle: state.article,
  cstate: state.cstate,
})

const mapDispatchToProps = dispatch => ({
  getDetail: cid => {
    dispatch(getRefactDetail('dir', cid, cid))
  },
  toggleExpandState: cid => {
    dispatch(categoryExpandChange(cid))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItemLi)
