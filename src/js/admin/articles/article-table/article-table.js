import React from 'react'
import { connect } from 'react-redux'

import ArticleRow from './article-row'
import ArticleTableLabel from './article-table-label'
import Table from '$components/tables/table'
import TableBody from '$components/tables/table-body'
import TableFoot from '$components/tables/table-foot'

const ArticleTable = ({ articles, checkState }) => {
  const articleRows = articles.map((article, index) => (
    <ArticleRow
      key={article.id}
      index={index}
      checked={checkState[article.id]}
      id={article.id}
      title={article.title}
      categoryname={article.categoryname}
      label={article.label}
      state={article.state}
      top={article.top}
      pageview={article.pageview}
    />
  ))
  return (
    <Table type="article">
      <ArticleTableLabel />
      <TableBody>{articleRows}</TableBody>
      <TableFoot />
    </Table>
  )
}

function getArticles (articles, categories) {
  var cats = {}
  for (var c of categories) {
    cats[c.id] = c.name
  }
  articles.forEach(article => (article.categoryname = cats[article.category]))
  return articles
}

const mapStateToProps = state => ({
  articles: getArticles(state.articles, state.categories),
  checkState: state.checkState,
})
const mapDispatchToProps = () => ({})

const _ArticleTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTable)
export default _ArticleTable
