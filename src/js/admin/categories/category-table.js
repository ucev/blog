import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import CategoryLabel from './category-label'
import CategoryRow from './category-row'
import Table from '../../components/tables/table'
import TableBody from '../../components/tables/table-body'
import TableFoot from '../../components/tables/table-foot'

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

const _CategoryTable = connect(
                         mapStateToProps,
                         mapDispatchToProps
                        )(CategoryTable)
export default _CategoryTable
