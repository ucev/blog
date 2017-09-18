import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import ArticleItemLi from './article-item-li'
import {
  categoryExpandChange,
  getRefactDetail
} from '../../redux/actions/category-refact'

class CategoryItemLi extends React.Component {
  constructor(props) {
    super(props)
    this.expandChange = this.expandChange.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }
  handleCategoryClick(e) {
    var target = e.target
    this.props.getDetail(this.props.category.id)
  }
  expandChange(e) {
    this.props.toggleExpandState(this.props.category.id)
    e.stopPropagation()
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      paddingLeft: (depth * 20 + 20) + 'px'
    }
    var category = this.props.category;
    var content;
    if (category.childs) {
      var content = category.childs.map(child => 
          child.type == 'dir' ?
            (<CategoryItemLi key = {`categoroy_${child.id}`} category = {child}  categoryId = {this.props.categoryId} articleId = {this.props.articleId} cstate = {this.props.cstate} depth = {depth + 1} getDetail = {this.props.getDetail} toggleExpandState = {this.props.toggleExpandState} />)
          :
            (<ArticleItemLi key = {`article_${child.id}`} article = {child} cid = {category.id} articleId = {this.props.articleId} depth = {depth + 1}/>)
      )
    }
    var titleClass = 'category-tree-category-title';
    if (category.id == this.props.categoryId) {
      titleClass += ' category-tree-category-title-current';
    }
    var articlesUlStyle = {};
    var titleImage = '/images/icons/ic_expand_more_white_24dp_2x.png';
    if (this.props.cstate[category.id] === false) {
      articlesUlStyle.display = 'none';
      titleImage = '/images/icons/ic_expand_less_white_24dp_2x.png';
    }
    return (
      <li className = 'category-tree-category-li'>
        <div className = 'category-tree-category-title-div'>
          <span className = {titleClass} onClick = {this.handleCategoryClick} style = {styles}>{category.title}</span>
          <img className = 'category-tree-category-title-img' src = {titleImage} onClick = {this.expandChange}></img>
        </div>
        <ul className = 'category-tree-category-ul' style = {articlesUlStyle}>
          {content}
        </ul>
      </li>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (cid) => {
    dispatch(getRefactDetail('dir', cid, cid))
  },
  toggleExpandState: (cid) => {
    dispatch(categoryExpandChange(cid))
  }
})

const _CategoryItemLi = connect(
                          mapStateToProps,
                          mapDispatchToProps
                        )(CategoryItemLi)
export default _CategoryItemLi
