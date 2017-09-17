const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

import { filterOptionChange } from '../../redux/actions/articles'

class FilterInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (e.which == 13) {
      var title = this.props.title
      var value = e.target.value
      this.props.onChange(title, value)
    }
  }
  render() {
    return (
      <div className = 'table-filter-item'>
        <label className = 'table-filter-item-label'>{this.props.label}</label>
        <input className = 'table-filter-item-input' onKeyDown = {this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  onChange: (title, value) => {
    dispatch(filterOptionChange(title, value))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterInput)
