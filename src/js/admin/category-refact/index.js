const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const CategoryTree = require('./category-tree')
const DetailArea = require('./detail-area')
import {
  getCategoryTree
} from '../../redux/actions/category-refact'

class CategoryRefactArea extends React.Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <div id='refact-area'>
        <CategoryTree />
        <DetailArea />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  init: () => {
    dispatch(getCategoryTree())
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryRefactArea)
