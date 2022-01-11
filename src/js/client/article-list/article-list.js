import React from 'react'

import ArticleItemSearch from '../article-item-search'
import ArticleItem from '../article-item'

import './article-list.style.scss'

class ArticleList extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    var articles = this.props.articles.map(article => {
      if (this.props.isSearch) {
        return (
          <ArticleItemSearch
            key={article.id}
            article={article}
            query={this.props.query}
          />
        )
      } else {
        return <ArticleItem key={article.id} article={article} />
      }
    })
    return <ul id="articles-list-ul">{articles}</ul>
  }
}

export default ArticleList
