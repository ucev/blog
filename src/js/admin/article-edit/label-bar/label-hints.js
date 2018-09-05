import React from 'react'
import { connect } from 'react-redux'

import LabelHintItem from './label-hint-item'

// const LabelHints = ({ labels, current }) => {
class LabelHints extends React.Component {
  constructor(props) {
    super(props)
    this.hintClick = this.hintClick.bind(this)
  }
  componentDidMount() {
    this.list.addEventListener('click', this.hintClick)
  }
  componentWillUnmount() {
    this.list.removeEventListener('click', this.hintClick)
  }
  hintClick(e) {
    var target = e.target
    var label = target.innerText
    this.props.click(label)
  }
  render() {
    var hints = []
    if (this.props.current != '') {
      var reg = new RegExp(this.props.current)
      hints = this.props.labels
        .filter(l => reg.test(l))
        .map((l, i) => <LabelHintItem key={i} name={l} />)
    }
    return (
      <ul
        id="label-hints"
        ref={list => {
          this.list = list
        }}>
        {hints}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  // 这个方案不完美
  current: state.labelTyping,
  labels: state.labelExist,
})

const mapDispatchToProps = () => ({})

const _LabelHints = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelHints)

export default _LabelHints
