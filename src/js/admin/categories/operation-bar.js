const React = require('react');
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

import {
  addCategoryDivStateChange
} from '../../redux/actions/categories'

class OperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.addNewCategory = this.addNewCategory.bind(this);
  }
  addNewCategory() {
    this.props.add()
  }
  render() {
    return (
      <div className = 'table-operation-bar table-operation-bar-top'>
        <button className = 'operation-button operation-button-confirm' onClick = {this.addNewCategory}>新建类别</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  add: () => {
    dispatch(addCategoryDivStateChange(true, 'add'))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationBar)
