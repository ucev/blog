const React = require('react');
const ReactDOM = require('react-dom');

const ConfirmDialog = require("../components/dialogs/confirm_dialog.js");
const OptionDialog = require("../components/dialogs/option_dialog.js");

const Table = require('../components/tables/table');
const TableLabel = require('../components/tables/table_label');
const TableBody = require('../components/tables/table_body');
const TableFoot = require('../components/tables/table_foot');
const TableNavLink = require("../components/table_foot_nav.js");

var ArticleAction = null;
var ArticleStore = null;
const ArticleListener = require('../flux/article_listener');

class FilterInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if (e.which == 13) {
      var title = this.props.title;
      var value = e.target.value;
      ArticleAction.filterOptionChange(title, value);
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
    ArticleAction.filterOptionChange(title, value);
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
    ArticleAction.allChecked(e.target.checked);
    e.stopPropagation();
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
    var id = this.props.article.id;
    var type = e.target.getAttribute('data-type');
    if (type == 'on' || type == 'off') {
      ArticleAction.articleStateChange(id, type);
    } else if (type == 'del') {
      ArticleAction.deleteArticle(id);
    } else if (type == 'check') {
      location.href = `/admin/articles/modify?id=${id}`;
    } else if (type == 'move') {
      ArticleAction.moveCategory(id);
    }
  }
  handleCheckStateChange(e) {
    var id = this.props.article.id;
    var checked = e.target.checked;
    ArticleAction.checkStateChange(id, checked);
  }
  render() {
    var article = this.props.article;
    const url = '/articles/view/' + article.id;
    const topStatus = article.top == 0 ? {} : {color: '#EF5350'};
    const articleState = this.article_state_label[article.state];
    const operation = this.article_operation[article.state];
    const checked = this.props.checked === true ? 'checked' : '';
    return (
      <tr key = {article.id} className='content-row-data'>
        <td className='content-row-checkbox-data'><input type='checkbox' checked = {checked} onChange = {this.handleCheckStateChange}/></td>
        <td className='content-row-index-data' onClick = {this.handleIndexClick}>{this.props.index + 1}</td>
        <td className='content-row-title-data' style={topStatus}><a href={url}>{article.title}</a></td>
        <td className='content-row-category-data'>{article.categoryname}</td>
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
        <ArticleRow key = {index} index = {index} checked = {checked} article = {article}/>
      );
    });
    return (
      <Table type = 'article'>
        <ArticleTableLabel allCheckState = {allCheckState}/>
        <TableBody>
          { articleRows }
        </TableBody>
        <TableFoot></TableFoot>
      </Table>
    );
  }
}

class ArticleLayout extends React.Component {
  constructor(props) {
    super(props);
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
    var listener = new ArticleListener();
    ArticleAction = listener.getAction();
    ArticleStore = listener.getStore();

    this.state = ArticleStore.getAll();
    this.__onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    ArticleStore.addChangeListener(this.__onChange);
    ArticleAction.fetchArticles();
    ArticleAction.fetchCategories();
  }
  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.__onChange);
  }
  __onChange() {
    this.setState(ArticleStore.getAll());
  }
  render() {
    /**
     * 这样感觉封装性稍差一点
     * 以后更有体会了再来看看😊
     * 先做一个标记
     */
    var groupopeReset = true;
    var categories = {};
    this.state.categories.forEach((category) => {
      categories[category.id] = category.name;
    })
    var articles = this.state.articles.map((article) => {
      var cid = article.category;
      article.categoryname = categories[cid];
      return article;
    })
    return ( 
      <div>
        <div className = 'table-filter-bar table-filter-bar-top'>
	        <button className = 'operation-button' onClick = {ArticleAction.addArticle.bind(ArticleAction)}>添加文章</button>
      	  <FilterInput key = 'label' title = 'label' label = '标签'/>
      	  <FilterInput key = 'category' title = 'category' label = '类别'/>
	        <FilterSelect key = 'state' title = 'state' label = '状态' options = {this.stateOptions}/>
        </div>
        <ArticleTable articles = {articles} checkState = {this.state.checkState}/>
        <div className = 'table-filter-bar table-filter-bar-bottom'>
       	  <FilterSelect title = 'groupope' options = {this.opeOptions} reset = {groupopeReset} defaultVal = '-1'/>
        </div>
        <TableNavLink page = {this.state.current} total = {this.state.total} pagechange = {ArticleAction.pageChange.bind(ArticleAction)} />
        <ConfirmDialog title = '确认删除?' confirm = {ArticleAction.deleteArticleConfirm.bind(ArticleAction)} cancel = {ArticleAction.deleteArticleCancel.bind(ArticleAction)} visible = {this.state.delVisible} />
        <OptionDialog title = '移动文章分组' optionItems = {this.state.categories} visible = {this.state.moveVisible} confirm = {ArticleAction.moveCategoryConfirm.bind(ArticleAction)} cancel = {ArticleAction.moveCategoryCancel.bind(ArticleAction)} />
      </div>
    );
  }
}

module.exports = ArticleLayout;