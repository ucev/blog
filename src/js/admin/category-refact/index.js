import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import CategoryTree from './category-tree'
import DetailArea from './detail-area'
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

const _CategoryRefactArea = connect(
                              mapStateToProps,
                              mapDispatchToProps
                            )(CategoryRefactArea)
export default _CategoryRefactArea
