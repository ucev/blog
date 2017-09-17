const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

import {
  categoryPrefaceChange,
  articleOrderChange,
} from '../../redux/actions/category-refact'

class DetailArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.prefaceButtonClicked = this.prefaceButtonClicked.bind(this);
  }
  prefaceButtonClicked(e) {
    var type = e.target.getAttribute('data-type');
    var isSet = type == 'set';
    this.props.categoryPrefaceChange(this.props.data.id, isSet);
  }
  handleKeyDown(e) {
    if (e.which == 13) {
      this.props.articleOrderChange(e.target.value, true);
    }
  }
  render() {
    var data = this.props.data;
    if (data.id) {
      var opeArea;
      if (data.type == 'dir') {
        opeArea = (
          <div id = 'refact-detail-ope-area'>
            <button id = 'refact-detail-ope-button' className = 'operation-button operation-button-confirm' data-type = 'cancel' onClick = {this.prefaceButtonClicked} >取消序言</button>
          </div>
        )
      } else {
        opeArea = (
          <div id = 'refact-detail-ope-area'>
            <button id = 'refact-detail-ope-button' className = 'operation-button operation-button-confirm' data-type = 'set' onClick = {this.prefaceButtonClicked} >设为序言</button>
            <label id = 'refact-detail-ope-order-label'>展示顺序</label><input id = 'refact-detail-ope-order-input' type = 'number' value = {data.suborder} onKeyDown = {this.handleKeyDown} />
          </div>
        )
      }
      return (
        <div id = 'refact-detail-area'>
          <div id = 'refact-article-brief-area'>
            <h1 id = 'refact-article-brief-area-title'>{data.title}</h1>
            <div id = 'refact-article-brief-area-descp'>{data.descp}</div>
          </div>
          {opeArea}
        </div>
      )
    } else {
      return (
        <div id = 'refact-detail-area'></div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  data: state.detail
})

const mapDispatchToProps = (dispatch) => ({
  articleOrderChange: (order, update) => {
    dispatch(articleOrderChange(order, update))
  },
  categoryPrefaceChange: (id, isSet) => {
    dispatch(categoryPrefaceChange(id, isSet))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailArea)
