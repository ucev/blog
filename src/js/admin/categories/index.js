const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const AddCategoryDialog = require('./add-category-dialog')
const ConfirmDialog = require("./confirm-dialog")
const OperationBar = require('./operation-bar')
const CategoryTable = require('./category-table')
import {
  fetchCategoryData
} from '../../redux/actions/categories'

class CategoryLayout extends React.Component {
  componentDidMount() {
    this.props.getData()
  }
  render() {
    return (
      <div>
        <OperationBar/>
        <CategoryTable />
        <AddCategoryDialog />
        <ConfirmDialog />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  getData: () => {
    dispatch(fetchCategoryData())
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryLayout)
