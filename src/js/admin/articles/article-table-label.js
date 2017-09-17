const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const TableLabel = require('../../components/tables/table_label')
import { allChecked } from '../../redux/actions/articles'

class ArticleTableLabel extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckStateChange = this.handleCheckStateChange.bind(this);
  }
  handleCheckStateChange(e) {
    this.props.checkAll(e.target.checked)
    e.stopPropagation()
  }
  render() {
    var checked = this.props.allCheckState == true ? 'checked': '';
    var labels = [
          {name: 'check', val: (<input type='checkbox' checked = {checked} onChange = {this.handleCheckStateChange}/>)},
          {name: 'index', val: '序号'},
          {name: 'title', val: '标题'},
          {name: 'category', val: '类别'},
          {name: 'label', val: '标签'},
          {name: 'status', val: '状态'},
          {name: 'pageview', val: '阅读次数'},
          {name: 'operation', val: '操作'}
    ]
    return (
      <TableLabel key = {1} type = 'article' labels = {labels} />
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  checkAll: (checked) => {
    dispatch(allChecked(checked))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTableLabel)
