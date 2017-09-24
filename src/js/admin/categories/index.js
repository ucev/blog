import React from 'react'
import { connect } from 'react-redux'

import AddCategoryDialog from './add-category-dialog'
import ConfirmDialog from './confirm-dialog'
import OperationBar from './operation-bar'
import CategoryTable from './category-table'
import {
  fetchCategoryData
} from '../../redux/actions/categories'

class CategoryLayout extends React.Component {
  componentDidMount () {
    this.props.getData()
  }
  render () {
    return (
      <div>
        <OperationBar/>
        <CategoryTable />
        <AddCategoryDialog />
        <ConfirmDialog />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  getData: () => {
    dispatch(fetchCategoryData())
  }
})

const _CategoryLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryLayout)
export default _CategoryLayout
