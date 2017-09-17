const React = require('react')
const ReactDOM = require('react-dom')
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const LabelTable = require('./label-table')
const TableNavLink = require("./table-nav-link")
import { orderChange as _orderChange, fetchLabelData } from '../../redux/actions/labels'

class LabelLayout extends React.Component {
  componentDidMount() {
    this.props.init()
  }
  render() {
    return (
      <div id = 'label-table-div'>
        <LabelTable />
        <TableNavLink />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})
const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => {
    dispatch(fetchLabelData())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(LabelLayout)
