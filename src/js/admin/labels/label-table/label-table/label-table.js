import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LabelRow from '../label-row'
import LabelTableLabel from '../table-label'
import Table from '$components/tables/table'
import TableBody from '$components/tables/table-body'
import TableFoot from '$components/tables/table-foot'

import './label-table.style.scss'

const LabelTable = ({ labels = [] }) => {
  labels = Array.from(labels)
  const labelRows = labels.map(label => (
    <LabelRow
      key={label.id}
      id={label.id}
      name={label.name}
      articles={label.articles}
      hotmark={label.hotmark}
      addtime={label.addtime}
    />
  ))
  return (
    <Table type="label">
      <LabelTableLabel />
      <TableBody>{labelRows}</TableBody>
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
      addtime: PropTypes.number.isRequired,
    })
  ),
}

const mapStateToProps = state => ({
  labels: state.labels,
})

const mapDispatchToProps = () => ({})

const _LabelTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelTable)

export default _LabelTable
