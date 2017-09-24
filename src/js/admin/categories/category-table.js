import React from 'react'
import { connect } from 'react-redux'

import CategoryLabel from './category-label'
import CategoryRow from './category-row'
import Table from '../../components/tables/table'
import TableBody from '../../components/tables/table-body'
import TableFoot from '../../components/tables/table-foot'

const CategoryTable = ({ categories }) => {
  var cats = categories.map((category) => (
    <CategoryRow
      key = {category.id}
      id = {category.id}
      name = {category.name}
      parent = {category.parent}
      descp = {category.descp}
      mainorder = {category.mainorder}
      articlecnt = {category.articlecnt}
    />
  ))
  return (
    <Table type = "category">
      <CategoryLabel />
      <TableBody>
        {cats}
      </TableBody>
      <TableFoot />
    </Table>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories
})
const mapDispatchToProps = () => ({})

const _CategoryTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTable)
export default _CategoryTable
