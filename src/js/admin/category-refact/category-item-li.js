import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import ArticleItemLi from './article-item-li'
import {
  categoryExpandChange,
  getRefactDetail
} from '../../redux/actions/category-refact'


const mapStateToProps = (state) => ({
  currCategory: state.category,
  currArticle: state.article,
  cstate: state.cstate
})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (cid) => {
    dispatch(getRefactDetail('dir', cid, cid))
  },
  toggleExpandState: (cid) => {
    dispatch(categoryExpandChange(cid))
  }
})

class CategoryItemLi extends React.Component {
  constructor(props) {
    super(props)
    this.expandChange = this.expandChange.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.getChildNodes = this.getChildNodes.bind(this)
  }
  handleCategoryClick() {
    this.props.getDetail(this.props.id)
  }
  expandChange(e) {
    this.props.toggleExpandState(this.props.id)
    e.stopPropagation()
  }
  getChildNodes() {
    var depth = this.props.depth;
    var childs = this.props.childs
    var cstate = this.props.cstate
    if (!childs) return
    var __CLI = connect(mapStateToProps, mapDispatchToProps)(CategoryItemLi)
    var content = childs.map(child => 
      child.type == 'dir' ?
        (
          <__CLI
            key = {`categoroy_${child.id}`}
            id = {child.id}
            title = {child.title}
            childs = {child.childs}
            expanded = {cstate[child.id] !== false}
            depth = {depth + 1}
          />)
      :
        (
          <ArticleItemLi
            key = {`article_${child.id}`} 
            id = {child.id}
            title = {child.title}
            article = {child}
            cid = {this.props.id} 
            depth = {depth + 1}
          />
      )
    )
    return content
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      paddingLeft: (depth * 20 + 20) + 'px'
    }
    var content = this.getChildNodes()
    var titleClass = 'category-tree-category-title';
    if (this.props.id == this.props.currCategory) {
      titleClass += ' category-tree-category-title-current';
    }
    var articlesUlStyle = {};
    var titleImage = '/images/icons/ic_expand_more_white_24dp_2x.png';
    if (this.props.expanded === false) {
      articlesUlStyle.display = 'none';
      titleImage = '/images/icons/ic_expand_less_white_24dp_2x.png';
    }
    return (
      <li className = 'category-tree-category-li'>
        <div className = 'category-tree-category-title-div'>
          <span className = {titleClass} onClick = {this.handleCategoryClick} style = {styles}>{this.props.title}</span>
          <img className = 'category-tree-category-title-img' src = {titleImage} onClick = {this.expandChange}></img>
        </div>
        <ul className = 'category-tree-category-ul' style = {articlesUlStyle}>
          {content}
        </ul>
      </li>
    )
  }
}

const _CategoryItemLi = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItemLi)


export default _CategoryItemLi
