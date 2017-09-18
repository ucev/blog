import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { 
  articleStateChange,
  handleMoveCategory,
  checkStateChange,
  handleDeleteArticle,
  modifyArticle
} from '../../redux/actions/articles'

class ArticleRow extends React.Component {
  constructor(props) {
    super(props);
    this.article_state_label = {
      on: '已上线',
      off: '已下线'
    };
    this.handleStateClick = this.handleStateClick.bind(this);
    this.handleCheckStateChange = this.handleCheckStateChange.bind(this);
    this.article_operation = {
      on: <ul className='content-operation-ul'><li data-type='off' onClick = {this.handleStateClick}>下线</li><li data-type='check' onClick = {this.handleStateClick}>核查</li></ul>,
      off: <ul className='content-operation-ul'><li data-type='on' onClick = {this.handleStateClick}>上线</li><li data-type='move' onClick = {this.handleStateClick}>移动</li><li data-type='check' onClick = {this.handleStateClick}>核查</li><li data-type='del' onClick = {this.handleStateClick}>删除</li></ul>
    }
  }
  handleStateClick(e) {
    var id = this.props.id;
    var type = e.target.getAttribute('data-type');
    if (type == 'on' || type == 'off') {
      this.props.articleState(id, type)
    } else if (type == 'del') {
      this.props.deleteArticle(id)
    } else if (type == 'check') {
      modifyArticle(id)
    } else if (type == 'move') {
      this.props.move(id)
    }
  }
  handleCheckStateChange(e) {
    var id = this.props.id;
    var checked = e.target.checked;
    this.props.checkState(id, checked)
  }
  render() {
    const url = '/articles/view/' + this.props.id;
    const topStatus = this.props.top == 0 ? {} : {color: '#EF5350'};
    const articleState = this.article_state_label[this.props.state];
    const operation = this.article_operation[this.props.state];
    const checked = this.props.checked === true ? 'checked' : '';
    return (
      <tr className='content-row-data'>
        <td className='content-row-checkbox-data'><input type='checkbox' checked = {checked} onChange = {this.handleCheckStateChange}/></td>
        <td className='content-row-index-data' onClick = {this.handleIndexClick}>{this.props.index + 1}</td>
        <td className='content-row-title-data' style={topStatus}><a href={url}>{this.props.title}</a></td>
        <td className='content-row-category-data'>{this.props.categoryname}</td>
        <td className='content-row-label-data'>{this.props.label}</td>
        <td className='content-row-status-data'>{articleState}</td>
        <td className='content-row-pageview-data'>{this.props.pageview}</td>
        <td className='content-row-operation-data'>{operation}</td>
      </tr>
    );
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  articleState: (id, type) => {
    dispatch(articleStateChange(id, type))
  },
  move: (id) => {
    dispatch(handleMoveCategory(id))
  },
  checkState: (id, checked) => {
    dispatch(checkStateChange(id, checked))
  },
  deleteArticle: (id) => {
    dispatch(handleDeleteArticle(id))
  }
})

const _ArticleRow = connect(
                      mapStateToProps,
                      mapDispatchToProps
                    )(ArticleRow)
export default _ArticleRow
