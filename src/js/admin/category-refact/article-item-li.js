import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import {
  getRefactDetail
} from '../../redux/actions/category-refact'


class ArticleItemLi extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClicked = this.onItemClicked.bind(this);
  }
  onItemClicked (e) {
    var article = this.props.article;
    this.props.getDetail(article.id, this.props.cid)
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      paddingLeft: (depth * 20 + 20) + 'px'
    }
    var article = this.props.article;
    var articleClass = 'category-tree-article-li';
    if (article.id == this.props.articleId) {
      articleClass += ' category-tree-article-li-current';
    }
    return <li className = {articleClass} style = {styles} onClick = {this.onItemClicked} >{article.title}</li>
  }
}

const mapStateToProps = (state) => ({})
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
