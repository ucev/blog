import React from 'react'
import { connect } from 'react-redux'

import CategoryTree from './category-tree'
import DetailArea from './detail-area'
import { getCategoryTree } from '$actions/category-refact'

class CategoryRefactArea extends React.Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <div id="refact-area">
        <CategoryTree />
        <DetailArea />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(getCategoryTree())
  },
})

const _CategoryRefactArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryRefactArea)
export default _CategoryRefactArea
