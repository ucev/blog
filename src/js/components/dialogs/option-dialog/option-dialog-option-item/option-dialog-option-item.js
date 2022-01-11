import React from 'react'

import './option-dialog-option-item.style.scss'

const OptionDialogOptionItem = props => (
  <li className="option-dialog-option-li" key={props.id}>
    <input
      type="radio"
      name="photogroup"
      value={props.id}
      onChange={props.handleGroupChange}
    />
    <label>{props.name}</label>
  </li>
)

export default OptionDialogOptionItem
