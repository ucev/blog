import React from 'react'
import { connect } from 'react-redux'

import {
  getRefactDetail
} from '$actions/category-refact'


class ArticleItemLi extends React.Component {
  constructor (props) {
    super(props)
    this.onItemClicked = this.onItemClicked.bind(this)
  }
  onItemClicked () {
    this.props.getDetail(this.props.id, this.props.cid)
  }
  render () {
    var depth = this.props.depth
    var styles = {
      paddingLeft: (depth * 20 + 20) + 'px'
    }
    var articleClass = 'category-tree-article-li'
    if (this.props.id == this.props.currArticle) {
      articleClass += ' category-tree-article-li-current'
    }
    return <li className = {articleClass} style = {styles} onClick = {this.onItemClicked} >{this.props.title}</li>
  }
}

const mapStateToProps = (state) => ({
  currArticle: state.article
})
const mapDispatchToProps = (dispatch) => ({
  getDetail: (aid, cid) => {
    dispatch(getRefactDetail('art', aid, cid))
  }
})

const _ArticleItemLi = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleItemLi)
export default _ArticleItemLi
