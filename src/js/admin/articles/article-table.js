const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const ArticleRow = require('./article-row')
const ArticleTableLabel = require('./article-table-label')
const Table = require('../../components/tables/table');
const TableBody = require('../../components/tables/table_body');
const TableFoot = require('../../components/tables/table_foot');

const ArticleTable = ({articles, categories, checkState}) => {
    var allCheckState = articles.every(article => checkState[article.id])
    articles = articles.map((article) => {
      var cid = article.category;
      article.categoryname = categories[cid];
      return article;
    })
    console.log(articles) 
    const articleRows = articles.map((article, index, arr) => (<ArticleRow key = {article.id} index = {index} checked = {checkState[article.id]} id = {article.id} title = {article.title} categoryname = {categories[article.cid]} label = {article.label} state = {article.state} top = {article.top} pageview = {article.pageview} />))
    return (
      <Table type = 'article'>
        <ArticleTableLabel allCheckState = {allCheckState}/>
        <TableBody>
          { articleRows }
        </TableBody>
        <TableFoot></TableFoot>
      </Table>
    );
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  categories: state.categories,
  checkState: state.checkState
})
const mapDispatchToProps = (dispatch) => ({})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTable)
