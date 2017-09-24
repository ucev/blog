import React from 'react'

class TableLabel extends React.Component {
  constructor (props) {
    super(props)
    this.orderState = {
      asc: {
        label: 'asc',
        imgsrc: '/images/icons/ic_arrow_drop_down_white_24dp_2x.png'
      },
      desc: {
        label: 'desc',
        imgsrc: '/images/icons/ic_arrow_drop_up_white_24dp_2x.png'
      }
    }
    this.handleOrderImgClick = this.handleOrderImgClick.bind(this)
  }
  handleOrderImgClick (e) {
    var orderby = e.target.getAttribute('data-label')
    var orderDirect = this.props.orderDirect == this.orderState.asc.label ? this.orderState.desc.label : this.orderState.asc.label
    this.props.orderChange(orderby, orderDirect)
  }
  render () {
    var targetsrc, othersrc
    if (this.props.orderDirect == this.orderState.asc.label) {
      targetsrc = this.orderState.asc.imgsrc
    } else {
      targetsrc = this.orderState.desc.imgsrc
    }
    othersrc = this.orderState.asc.imgsrc
    var labels = this.props.labels.map((label) => {
      var classes = `content-row-${label.name}-label ${this.props.type}-row-${label.name}-label`
      if (label.sorted === true) {
        return (
          <th className = {classes}>{label.val}<img className = "label-row-hotmark-order-img" src = {this.props.orderby == label.sortname ? targetsrc : othersrc} data-label = {label.sortname} onClick =  {this.handleOrderImgClick} ></img></th>
        )
      } else {
        return (
          <th className = {classes}>{label.val}</th>
        )
      }
    })
    return (
      <thead>
        <tr className = "content-row-label">
          {labels}
        </tr>
      </thead>
    )
  }
}

export default TableLabel
