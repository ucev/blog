const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const LabelRow = require('./table-row')
const LabelTableLabel = require('./table-label')
const Table = require('../../components/tables/table')
const TableBody = require('../../components/tables/table_body')
const TableFoot = require('../../components/tables/table_foot')
 
const LabelTable = ({labels = []}) => {
  labels = Array.from(labels)
  const labelRows = labels.map(label => <LabelRow key = {label.id} label = {label} />)
  return (
    <Table type = 'label'>
      <LabelTableLabel />
      <TableBody>
        {labelRows}
      </TableBody>
      <TableFoot />
    </Table>
  )
}


LabelTable.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      articles: PropTypes.number.isRequired,
      hotmark: PropTypes.number.isRequired,
      addtime: PropTypes.number.isRequired
    })
  )
}

const mapStateToProps = (state) => ({
  labels: state.labels
})

const mapDispatchToProps = (dispatch) => ({
})

const LT = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelTable)

module.exports = LT