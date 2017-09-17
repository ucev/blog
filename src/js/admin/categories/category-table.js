const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const CategoryLabel = require('./category-label')
const CategoryRow = require('./category-row')
const Table = require('../../components/tables/table')
const TableBody = require('../../components/tables/table_body')
const TableFoot = require('../../components/tables/table_foot')

const CategoryTable = ({ categories }) => {
  var categories = categories.map((category) => (<CategoryRow key = {category.id} category = {category} />))
  return (
    <Table type = 'category'>
      <CategoryLabel />
      <TableBody>
        {categories}
      </TableBody>
      <TableFoot />
    </Table>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories
})
const mapDispatchToProps = (dispatch) => ({})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTable)
