import React from 'react'
import { connect } from 'react-redux'

import OperationConfirmButton from '$components/buttons/operation-confirm-button'

import {
  categoryPrefaceChange,
  articleOrderChange,
} from '$actions/category-refact'

import './detail-area.style.scss'

class DetailArea extends React.Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.prefaceButtonClicked = this.prefaceButtonClicked.bind(this)
  }
  prefaceButtonClicked (e) {
    var type = e.target.getAttribute('data-type')
    var isSet = type == 'set'
    this.props.categoryPrefaceChange(this.props.id, isSet)
  }
  handleKeyDown (e) {
    if (e.which == 13) {
      this.props.articleOrderChange(this.orderInput.value, true)
    }
  }
  handleOrderChange (e) {
    this.props.articleOrderChange(this.orderInput.value, false)
    e.stopPropagation()
  }
  render () {
    if (this.props.id) {
      let opeArea
      if (this.props.type == 'dir') {
        opeArea = (
          <div id="refact-detail-ope-area">
            <OperationConfirmButton
              id="refact-detail-ope-button"
              dataType="cancel"
              title="取消序言"
              onClick={this.prefaceButtonClicked}
            />
          </div>
        )
      } else {
        opeArea = (
          <div id="refact-detail-ope-area">
            <OperationConfirmButton
              id="refact-detail-ope-button"
              title="设为序言"
              dataType="set"
              onClick={this.prefaceButtonClicked}
            />
            <label id="refact-detail-ope-order-label">展示顺序</label>
            <input
              id="refact-detail-ope-order-input"
              type="number"
              ref={input => {
                this.orderInput = input
              }}
              value={this.props.order}
              onChange={this.handleOrderChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        )
      }
      return (
        <div id="refact-detail-area">
          <div id="refact-article-brief-area">
            <h1 id="refact-article-brief-area-title">{this.props.title}</h1>
            <div id="refact-article-brief-area-descp">{this.props.descp}</div>
          </div>
          {opeArea}
        </div>
      )
    } else {
      return <div id="refact-detail-area" />
    }
  }
}

const mapStateToProps = state => ({
  id: state.detail.id,
  order: state.detail.suborder,
  title: state.detail.title,
  type: state.detail.type,
  descp: state.detail.descp,
})

const mapDispatchToProps = dispatch => ({
  articleOrderChange: (order, update) => {
    dispatch(articleOrderChange(order, update))
  },
  categoryPrefaceChange: (id, isSet) => {
    dispatch(categoryPrefaceChange(id, isSet))
  },
})

const _DetailArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailArea)
export default _DetailArea
