const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

import { filterOptionChange } from '../../redux/actions/articles'

class FilterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    var title = this.props.title;
    var value = e.target.value;
    this.props.onChange(title, value)
  }
  render() {
    const options = this.props.options.map((opt) => {
      if (this.props.reset == true && opt.value == -1) {
        return <option value = {opt.value} selected = 'selected'>{opt.title}</option>
      } else {
        return <option value = {opt.value}>{opt.title}</option>
      }
    });
    return (
      <div className = 'table-filter-item'>
        <label className = 'table-filter-item-label'>{this.props.label}</label>
        <select className = 'table-filter-item-select' onChange = {this.handleChange} >
          {options}
        </select>
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
)(FilterSelect)
