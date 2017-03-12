const React = require('../node_modules/react');
const ReactDOM = require('../node_modules/react-dom');

const ConfirmDialog = require("./components/confirm_dialog.js");
const OptionDialog = require("./components/option_dialog.js");
const TableNavLink = require("./components/table_foot_nav.js");

class FilterInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (e.which == 13) {
      var title = this.props.title;
      var value = e.target.value;
      this.props.change(title, value);
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

class FilterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    var title = this.props.title;
    var value = e.target.value;
    this.props.change(title, value);
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

class ArticleTableLabel extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckStateChange = this.handleCheckStateChange.bind(this);
  }
  handleCheckStateChange(e) {
    this.props.allChecked(e.target.checked);
    e.stopPropagation();
  }
  render() {
    var checked = this.props.allCheckState == true ? 'checked': '';
    return (
      <tr className='content-row-label'>
        <th className='content-row-check-label'><input type='checkbox' checked = {checked} onChange = {this.handleCheckStateChange}/></th>
        <th className='content-row-index-label'>序号</th>
        <th className='content-row-title-label'>标题</th>
        <th className='content-row-category-label'>类别</th>
        <th className='content-row-label-label'>标签</th>
        <th className='content-row-status-label'>状态</th>
        <th className='content-row-pageview-label'>阅读次数</th>
        <th className='content-row-operation-label'>操作</th>
      </tr>
    );
  }
}

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
      on: <ul className='article-operation-ul'><li data-type='off' onClick = {this.handleStateClick}>下线</li><li data-type='check' onClick = {this.handleStateClick}>核查</li></ul>,
      off: <ul className='article-operation-ul'><li data-type='on' onClick = {this.handleStateClick}>上线</li><li data-type='move' onClick = {this.handleStateClick}>移动</li><li data-type='check' onClick = {this.handleStateClick}>核查</li><li data-type='del' onClick = {this.handleStateClick}>删除</li></ul>
    }
  }
  handleStateClick(e) {
    var id = this.props.article.id;
    var type = e.target.getAttribute('data-type');
    this.props.handleStateClick(id, type);
  }
  handleCheckStateChange(e) {
    var id = this.props.article.id;
    var checked = e.target.checked;
    this.props.checkStateChange(id, checked);
  }
  render() {
    var article = this.props.article;
    const url = '/articles/view/' + article.id;
    const topStatus = article.top == 0 ? {} : {color: '#EF5350'};
    const articleState = this.article_state_label[article.state];
    const operation = this.article_operation[article.state];
    const checked = this.props.checked === true ? 'checked' : '';
    return (
      <tr className='content-row-data'>
        <td className='content-row-checkbox-data'><input type='checkbox' checked = {checked} onChange = {this.handleCheckStateChange}/></td>
        <td className='content-row-index-data' onClick = {this.handleIndexClick}>{this.props.index + 1}</td>
        <td className='content-row-title-data' style={topStatus}><a href={url}>{article.title}</a></td>
        <td className='content-row-category-data'>{article.category}</td>
        <td className='content-row-label-data'>{article.label}</td>
        <td className='content-row-status-data'>{articleState}</td>
        <td className='content-row-pageview-data'>{article.pageview}</td>
        <td className='content-row-operation-data'>{operation}</td>
      </tr>
    );
  }
}

class ArticleTable extends React.Component {
  constructor(props) {
    super(props);
    this.allChecked = this.allChecked.bind(this);
    this.handleStateClick = this.handleStateClick.bind(this);
    this.checkStateChange = this.checkStateChange.bind(this);
  }
  allChecked(checked) {
    this.props.allChecked(checked);
  }
  handleStateClick(id, type) {
    if (type == 'on' || type == 'off') {
      this.props.articleStateChange(id, type);
    } else if (type == 'del') {
      this.props.delete(id);
    } else if (type == 'check') {
      location.href = `/admin/articles/modify?id=${id}`;
    } else if (type == 'move') {
      this.props.handleMoveCategory(id);
    }
  }
  checkStateChange(id, checked) {
    this.props.checkStateChange(id, checked);     
  }
  render() {
    var that = this;
    var articles = this.props.articles;
    var checkState = this.props.checkState;
    var allCheckState = true;
    for (var article of articles) {
      if (checkState[article.id] !== true) {
        allCheckState = false;
        break;
      }
    }
    const articleRows = articles.map((article, index, arr) => {
      var checked = checkState[article.id];
      return (
        <ArticleRow key = {index} index = {index} checked = {checked} article = {article} handleStateClick = {this.handleStateClick} checkStateChange = {this.checkStateChange} />
      );
    });
    return (
      <table className='content-table'>
        <thead>
	  <ArticleTableLabel allCheckState = {allCheckState} allChecked = {this.allChecked}/>
        </thead>
        <tbody>
	  { articleRows }
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    );
  }
}

class ArticleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      current: 0,
      total: 0,
      checkState: {},
      // delete dialog
      delVisible: false,
      delArticleId: -1,
      // move dialog
      moveVisible: false,
      categories: [],
      moveArticleId: -1,
      // group operation
      isgroup: false
    }
    this.stateOptions = [
      {value: '-1', title: '全部'},
      {value: 'on', title: '已上线'},
      {value: 'off', title: '已下线'}
    ];
    this.opeOptions = [
      {value: '-1', title: '--选择操作--'},
      {value: 'on', title: '上线'},
      {value: 'off', title: '下线'},
      {value: 'move', title: '移动'},
      {value: 'del', title: '删除'}
    ];
    this.addArticle = this.addArticle.bind(this);
    this.articleStateChange = this.articleStateChange.bind(this);
    this.articleGroupChange = this.articleGroupChange.bind(this);
    this.allChecked = this.allChecked.bind(this);
    this.checkStateChange = this.checkStateChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
    this.deleteArticleConfirm = this.deleteArticleConfirm.bind(this);
    this.deleteArticleCancel = this.deleteArticleCancel.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.fetchSingleArticle = this.fetchSingleArticle.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.groupOpeChange = this.groupOpeChange.bind(this);
    // categories
    this.moveCategoryConfirm = this.moveCategoryConfirm.bind(this);
    this.moveCategoryCancel = this.moveCategoryCancel.bind(this);
    this.handleMoveCategory = this.handleMoveCategory.bind(this);
  
    this.filter = {start : 0};
    this.fetchArticles();
    this.fetchCategories();
  }
  addArticle() {
    location.href = '/admin/articles/add';
  }
  articleStateChange(id, type, isgroup = false) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/state',
      data: {id: id, state: type},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (isgroup) {
          that.fetchArticles();
        } else {
          that.fetchSingleArticle(id);
        }
      },
      error: function() {
        console.log(error);
      }
    });
  }
  articleGroupChange(id, gid, isgroup = false) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/move',
      data: {id: id, gid: gid},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          if (that.state.isgroup) {
            that.fetchArticles();
            that.setState({
              moveVisible: false,
              moveArticleId: -1,
              isgroup: false
            })
          } else {
            that.setState({
              moveVisible: false,
              moveArticleId: -1
            })
            that.fetchSingleArticle(id);
          }
        }
      }
    })
  }
  checkStateChange(id, checked) {
    var checkState = this.state.checkState;
    checkState[id] = checked;
    this.setState({
      checkState: checkState
    })
  }
  allChecked(checked) {
    var articles = this.state.articles;
    var checkState = {};
    for (let i = 0; i < articles.length; i++) {
      checkState[articles[i].id] = checked;
    }
    this.setState({
      checkState: checkState
    })
  }
  fetchSingleArticle(id) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/get',
      type: 'get',
      data: {id: id},
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          var articles = that.state.articles;
          for (let i in articles) {
            if (articles[i].id == id) {
              articles[i] = dt.data;
              that.setState({
                articles: articles
              });
              break;
            }
          }
        }
      }
    })
  }
  fetchArticles() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/get',
      type: 'get',
      data: that.filter,
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.setState({
            articles: dt.data.data,
            current: dt.data.current,
            total: dt.data.total,
            checkState: {}
          });
        }
      }
    });
  }
  fetchCategories() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/get',
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.setState({
            categories: dt.data
          })
        }
      }
    })
  }
  handlePageChange(i) {
    this.filter.start = i;
    this.fetchArticles();
  }
  handleFilterChange(label, value) {
    if (this.filter[label] == value) return;
    this.filter[label] = value;
    this.filter.start = 0;
    this.fetchArticles();
  }
  handleDeleteArticle(id) {
    this.setState({
      delVisible: true,
      delArticleId: id,
      isgroup: false
    })
  }
  deleteArticleConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/delete',
      data: {id: that.state.delArticleId},
      type: 'post',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.setState({
            delVisible: false,
            delArticleId: -1
          })
          that.fetchArticles();
        }
      }
    })
  }
  deleteArticleCancel() {
    this.setState({
      delVisible: false
    })
  }
  groupOpeChange(title, value) {
    var checkState = this.state.checkState;
    var ids = [];
    for (let key in checkState) {
      if (checkState[key]) ids.push(key);
    }
    ids = ids.join(',');
    switch (value) {
      case 'on':
      case 'off':
        this.articleStateChange(ids, value, true);
        break;
      case 'move':
        this.setState({
          moveArticleId: ids,
          isgroup: true,
          moveVisible: true
        })
        break;
      case 'del':
        this.setState({
          delArticleId: ids,
          isgroup: true,
          delVisible: true
        })
        break;
      default:
        break;
    }
  }
  //category
  moveCategoryConfirm(gid) {
    this.articleGroupChange(this.state.moveArticleId, gid, false);
  }
  moveCategoryCancel() {
    this.setState({
      moveVisible: false
    })
  }
  handleMoveCategory(id) {
    this.setState({
      moveArticleId: id,
      isgroup: false,
      moveVisible: true
    })
  }
  render() {
    /**
     * 这样感觉封装性稍差一点
     * 以后更有体会了再来看看😊
     * 先做一个标记
     */
    var groupopeReset = true;
    return (
      <div>
        <div className = 'table-filter-bar table-filter-bar-top'>
	        <button className = 'operation-button' onClick = {this.addArticle}>添加文章</button>
      	  <FilterInput title = 'label' label = '标签' change = {this.handleFilterChange} />
      	  <FilterInput title = 'category' label = '类别' change = {this.handleFilterChange} />
	        <FilterSelect title = 'state' label = '状态' options = {this.stateOptions} change = {this.handleFilterChange} />
        </div>
        <ArticleTable articles = {this.state.articles} checkState = {this.state.checkState} fetchSingleArticle = {this.fetchSingleArticle} checkStateChange = {this.checkStateChange} articleStateChange = {this.articleStateChange} handleMoveCategory = {this.handleMoveCategory} allChecked = {this.allChecked} delete = {this.handleDeleteArticle}/>
        <div className = 'table-filter-bar table-filter-bar-bottom'>
       	  <FilterSelect title = 'groupope' options = {this.opeOptions} change = {this.groupOpeChange} reset = {groupopeReset} defaultVal = '-1'/>
        </div>
        <TableNavLink page = {this.state.current} total = {this.state.total} pagechange = {this.handlePageChange} />
        <ConfirmDialog title = '确认删除?' confirm = {this.deleteArticleConfirm} cancel = {this.deleteArticleCancel} visible = {this.state.delVisible} />
        <OptionDialog title = '移动文章分组' optionItems = {this.state.categories} confirm = {this.moveCategoryConfirm} cancel = {this.moveCategoryCancel} visible = {this.state.moveVisible} />
      </div>
    );
  }
}

module.exports = ArticleLayout;