import React from 'react'
import { connect } from 'react-redux'

import Label from '../label'
import LabelHints from '../label-hints'
import OperationBar from '$components/operation-bar'

import { addLabel, labelTypingChange } from '$actions/article-edit'

import './label-bar.style.scss'

class LabelBar extends React.Component {
  constructor (props) {
    super(props)
    this.addLabel = this.addLabel.bind(this)
    this.labelKeyDown = this.labelKeyDown.bind(this)
    this.labelTypingChange = this.labelTypingChange.bind(this)
  }
  labelKeyDown (e) {
    if (e.which == 13) {
      var label = this.input.value
      this.props.add(label)
      this.input.value = ''
    }
  }
  addLabel (label) {
    this.props.add(label)
    this.input.value = ''
    this.props.getHint('')
  }
  labelTypingChange () {
    this.props.getHint(this.input.value)
  }
  render () {
    var lbs = this.props.labels.map((l, i) => <Label label={l} key={i} />)
    return (
      <OperationBar id="article-labels">
        <label id="label-label">标签</label>
        <input
          id="label-input-area"
          ref={input => {
            this.input = input
          }}
          type="text"
          placeholder="输入标签"
          maxLength={10}
          autoComplete="off"
          onKeyDown={this.labelKeyDown}
          onChange={this.labelTypingChange}
        />
        <div id="labels-area">{lbs}</div>
        <LabelHints click={this.addLabel} />
      </OperationBar>
    )
  }
}

const mapStateToProps = state => ({
  labels: state.labelCurrent,
})

const mapDispatchToProps = dispatch => ({
  add: label => {
    dispatch(addLabel(label))
  },
  getHint: label => {
    dispatch(labelTypingChange(label))
  },
})

const _LabelBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelBar)

export default _LabelBar
