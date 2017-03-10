class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }
  handleConfirmClick(e) {
    this.props.confirm();
  }
  handleCancelClick(e) {
    this.props.cancel();
  }
  render() {
    var styles = {};
    if (!this.props.visible) styles.display = 'none';
    return React.createElement(
      'div',
      { className: 'dialog-div del-dialog', style: styles },
      React.createElement(
        'div',
        { className: 'dialog-header-div' },
        React.createElement(
          'div',
          { className: 'dialog-title-div' },
          this.props.title
        )
      ),
      React.createElement(
        'div',
        { className: 'dialog-bottom-operation-bar' },
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-confirm-button', onClick: this.handleConfirmClick },
          '\u786E\u5B9A'
        ),
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-cancel-button', onClick: this.handleCancelClick },
          '\u53D6\u6D88'
        )
      )
    );
  }
}
class TableNavLinkLi extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.click(this.props.page);
  }
  render() {
    var classes = 'table-nav-ul-li';
    if (this.props.current == this.props.page) classes += ' table-nav-ul-li-current';
    return React.createElement(
      'li',
      { className: classes, onClick: this.handleClick },
      this.props.title
    );
  }
}
class TableNavLink extends React.Component {
  constructor(props) {
    super(props);
    this.getRenderData = this.getRenderData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(pg) {
    this.props.pagechange(pg);
  }
  getRenderData() {
    const page = this.props.page;
    const total = this.props.total;
    var start = page < 5 ? 0 : page - 5;
    var len;
    if (start + 10 <= total) {
      len = 10;
    } else if (total - 10 > 0) {
      start = total - 10;
      len = 10;
    } else {
      start = 0;
      len = total;
    }
    var lis = [];
    if (page != 0) lis.push(React.createElement(TableNavLinkLi, { page: page - 1, current: page, title: '\u4E0A\u4E00\u9875', click: this.handleClick }));
    for (let i = 1; i <= len; i++) lis.push(React.createElement(TableNavLinkLi, { page: start + i - 1, current: page, title: start + i, click: this.handleClick }));
    if (page + 1 < total) lis.push(React.createElement(TableNavLinkLi, { page: page + 1, current: page, title: '\u4E0B\u4E00\u9875', click: this.handleClick }));
    return lis;
  }
  render() {
    const lis = this.getRenderData();
    return React.createElement(
      'ul',
      { id: 'table-nav-ul' },
      lis
    );
  }
}
class MoveGroupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.state = {
      newgroup: -1
    };
  }

  handleConfirmClick(e) {
    this.props.confirm(this.state.newgroup);
  }

  handleCancelClick(e) {
    this.props.cancel();
  }

  handleGroupChange(e) {
    var radio = e.target;
    if (radio.checked) {
      this.setState({
        newgroup: radio.value
      });
    }
  }

  render() {
    var styles = {};
    if (!this.props.visible) styles.display = 'none';
    var groupItems = this.props.categories.map(group => {
      if (group.id == -1) return '';
      return React.createElement(
        'li',
        { className: 'move-group-radio-li' },
        React.createElement('input', { type: 'radio', name: 'photogroup', value: group.id, onChange: this.handleGroupChange }),
        React.createElement(
          'label',
          null,
          group.name
        )
      );
    });
    return React.createElement(
      'div',
      { className: 'dialog-div option-dialog move-category-dialog', style: styles },
      React.createElement(
        'div',
        { className: 'dialog-main-body-div' },
        React.createElement(
          'ul',
          { id: 'move-group-radio-ul' },
          groupItems
        )
      ),
      React.createElement(
        'div',
        { className: 'dialog-bottom-operation-bar' },
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-confirm-button', onClick: this.handleConfirmClick },
          '\u786E\u5B9A'
        ),
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-cancel-button', onClick: this.handleCancelClick },
          '\u53D6\u6D88'
        )
      )
    );
  }
}
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
    return React.createElement(
      'div',
      { className: 'table-filter-item' },
      React.createElement(
        'label',
        { className: 'table-filter-item-label' },
        this.props.label
      ),
      React.createElement('input', { className: 'table-filter-item-input', onKeyDown: this.handleChange })
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
    const options = this.props.options.map(opt => {
      if (this.props.reset == true && opt.value == -1) {
        return React.createElement(
          'option',
          { value: opt.value, selected: 'selected' },
          opt.title
        );
      } else {
        return React.createElement(
          'option',
          { value: opt.value },
          opt.title
        );
      }
    });
    return React.createElement(
      'div',
      { className: 'table-filter-item' },
      React.createElement(
        'label',
        { className: 'table-filter-item-label' },
        this.props.label
      ),
      React.createElement(
        'select',
        { className: 'table-filter-item-select', onChange: this.handleChange },
        options
      )
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
    var checked = this.props.allCheckState == true ? 'checked' : '';
    return React.createElement(
      'tr',
      { className: 'content-row-label' },
      React.createElement(
        'th',
        { className: 'content-row-check-label' },
        React.createElement('input', { type: 'checkbox', checked: checked, onChange: this.handleCheckStateChange })
      ),
      React.createElement(
        'th',
        { className: 'content-row-index-label' },
        '\u5E8F\u53F7'
      ),
      React.createElement(
        'th',
        { className: 'content-row-title-label' },
        '\u6807\u9898'
      ),
      React.createElement(
        'th',
        { className: 'content-row-category-label' },
        '\u7C7B\u522B'
      ),
      React.createElement(
        'th',
        { className: 'content-row-label-label' },
        '\u6807\u7B7E'
      ),
      React.createElement(
        'th',
        { className: 'content-row-status-label' },
        '\u72B6\u6001'
      ),
      React.createElement(
        'th',
        { className: 'content-row-pageview-label' },
        '\u9605\u8BFB\u6B21\u6570'
      ),
      React.createElement(
        'th',
        { className: 'content-row-operation-label' },
        '\u64CD\u4F5C'
      )
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
      on: React.createElement(
        'ul',
        { className: 'article-operation-ul' },
        React.createElement(
          'li',
          { 'data-type': 'off', onClick: this.handleStateClick },
          '\u4E0B\u7EBF'
        ),
        React.createElement(
          'li',
          { 'data-type': 'check', onClick: this.handleStateClick },
          '\u6838\u67E5'
        )
      ),
      off: React.createElement(
        'ul',
        { className: 'article-operation-ul' },
        React.createElement(
          'li',
          { 'data-type': 'on', onClick: this.handleStateClick },
          '\u4E0A\u7EBF'
        ),
        React.createElement(
          'li',
          { 'data-type': 'move', onClick: this.handleStateClick },
          '\u79FB\u52A8'
        ),
        React.createElement(
          'li',
          { 'data-type': 'check', onClick: this.handleStateClick },
          '\u6838\u67E5'
        ),
        React.createElement(
          'li',
          { 'data-type': 'del', onClick: this.handleStateClick },
          '\u5220\u9664'
        )
      )
    };
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
    const topStatus = article.top == 0 ? {} : { color: '#EF5350' };
    const articleState = this.article_state_label[article.state];
    const operation = this.article_operation[article.state];
    const checked = this.props.checked === true ? 'checked' : '';
    return React.createElement(
      'tr',
      { className: 'content-row-data' },
      React.createElement(
        'td',
        { className: 'content-row-checkbox-data' },
        React.createElement('input', { type: 'checkbox', checked: checked, onChange: this.handleCheckStateChange })
      ),
      React.createElement(
        'td',
        { className: 'content-row-index-data', onClick: this.handleIndexClick },
        this.props.index + 1
      ),
      React.createElement(
        'td',
        { className: 'content-row-title-data', style: topStatus },
        React.createElement(
          'a',
          { href: url },
          article.title
        )
      ),
      React.createElement(
        'td',
        { className: 'content-row-category-data' },
        article.category
      ),
      React.createElement(
        'td',
        { className: 'content-row-label-data' },
        article.label
      ),
      React.createElement(
        'td',
        { className: 'content-row-status-data' },
        articleState
      ),
      React.createElement(
        'td',
        { className: 'content-row-pageview-data' },
        article.pageview
      ),
      React.createElement(
        'td',
        { className: 'content-row-operation-data' },
        operation
      )
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
      return React.createElement(ArticleRow, { key: index, index: index, checked: checked, article: article, handleStateClick: this.handleStateClick, checkStateChange: this.checkStateChange });
    });
    return React.createElement(
      'table',
      { className: 'content-table' },
      React.createElement(
        'thead',
        null,
        React.createElement(ArticleTableLabel, { allCheckState: allCheckState, allChecked: this.allChecked })
      ),
      React.createElement(
        'tbody',
        null,
        articleRows
      ),
      React.createElement('tfoot', null)
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
    };
    this.stateOptions = [{ value: '-1', title: '全部' }, { value: 'on', title: '已上线' }, { value: 'off', title: '已下线' }];
    this.opeOptions = [{ value: '-1', title: '--选择操作--' }, { value: 'on', title: '上线' }, { value: 'off', title: '下线' }, { value: 'move', title: '移动' }, { value: 'del', title: '删除' }];
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

    this.filter = { start: 0 };
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
      data: { id: id, state: type },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (isgroup) {
          that.fetchArticles();
        } else {
          that.fetchSingleArticle(id);
        }
      },
      error: function () {
        console.log(error);
      }
    });
  }
  articleGroupChange(id, gid, isgroup = false) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/move',
      data: { id: id, gid: gid },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          if (that.state.isgroup) {
            that.fetchArticles();
            that.setState({
              moveVisible: false,
              moveArticleId: -1,
              isgroup: false
            });
          } else {
            that.setState({
              moveVisible: false,
              moveArticleId: -1
            });
            that.fetchSingleArticle(id);
          }
        }
      }
    });
  }
  checkStateChange(id, checked) {
    var checkState = this.state.checkState;
    checkState[id] = checked;
    this.setState({
      checkState: checkState
    });
  }
  allChecked(checked) {
    var articles = this.state.articles;
    var checkState = {};
    for (let i = 0; i < articles.length; i++) {
      checkState[articles[i].id] = checked;
    }
    this.setState({
      checkState: checkState
    });
  }
  fetchSingleArticle(id) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/get',
      type: 'get',
      data: { id: id },
      dataType: 'json',
      success: function (dt) {
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
    });
  }
  fetchArticles() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/get',
      type: 'get',
      data: that.filter,
      dataType: 'json',
      success: function (dt) {
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
      success: function (dt) {
        if (dt.code == 0) {
          that.setState({
            categories: dt.data
          });
        }
      }
    });
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
    });
  }
  deleteArticleConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/delete',
      data: { id: that.state.delArticleId },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.setState({
            delVisible: false,
            delArticleId: -1
          });
          that.fetchArticles();
        }
      }
    });
  }
  deleteArticleCancel() {
    this.setState({
      delVisible: false
    });
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
        });
        break;
      case 'del':
        this.setState({
          delArticleId: ids,
          isgroup: true,
          delVisible: true
        });
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
    });
  }
  handleMoveCategory(id) {
    this.setState({
      moveArticleId: id,
      isgroup: false,
      moveVisible: true
    });
  }
  render() {
    /**
     * 这样感觉封装性稍差一点
     * 以后更有体会了再来看看😊
     * 先做一个标记
     */
    var groupopeReset = true;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'table-filter-bar table-filter-bar-top' },
        React.createElement(
          'button',
          { className: 'operation-button', onClick: this.addArticle },
          '\u6DFB\u52A0\u6587\u7AE0'
        ),
        React.createElement(FilterInput, { title: 'label', label: '\u6807\u7B7E', change: this.handleFilterChange }),
        React.createElement(FilterInput, { title: 'category', label: '\u7C7B\u522B', change: this.handleFilterChange }),
        React.createElement(FilterSelect, { title: 'state', label: '\u72B6\u6001', options: this.stateOptions, change: this.handleFilterChange })
      ),
      React.createElement(ArticleTable, { articles: this.state.articles, checkState: this.state.checkState, fetchSingleArticle: this.fetchSingleArticle, checkStateChange: this.checkStateChange, articleStateChange: this.articleStateChange, handleMoveCategory: this.handleMoveCategory, allChecked: this.allChecked, 'delete': this.handleDeleteArticle }),
      React.createElement(
        'div',
        { className: 'table-filter-bar table-filter-bar-bottom' },
        React.createElement(FilterSelect, { title: 'groupope', options: this.opeOptions, change: this.groupOpeChange, reset: groupopeReset, defaultVal: '-1' })
      ),
      React.createElement(TableNavLink, { page: this.state.current, total: this.state.total, pagechange: this.handlePageChange }),
      React.createElement(ConfirmDialog, { title: '\u786E\u8BA4\u5220\u9664?', confirm: this.deleteArticleConfirm, cancel: this.deleteArticleCancel, visible: this.state.delVisible }),
      React.createElement(MoveGroupDialog, { categories: this.state.categories, confirm: this.moveCategoryConfirm, cancel: this.moveCategoryCancel, visible: this.state.moveVisible })
    );
  }
}
function adminArticlesInit() {
  ReactDOM.render(React.createElement(ArticleLayout, null), document.getElementById('table-div'));
}
class OperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.addNewCategory = this.addNewCategory.bind(this);
  }
  addNewCategory() {
    this.props.addNewCategory(true, 'add');
  }
  render() {
    return React.createElement(
      'div',
      { className: 'table-operation-bar table-operation-bar-top' },
      React.createElement(
        'button',
        { className: 'operation-button operation-button-confirm', onClick: this.addNewCategory },
        '\u65B0\u5EFA\u7C7B\u522B'
      )
    );
  }
}
class AddCategoryDiv extends React.Component {
  constructor(props) {
    super(props);
    this.valueChange = this.valueChange.bind(this);
    this.addCategoryCancel = this.addCategoryCancel.bind(this);
    this.addCategoryConfirm = this.addCategoryConfirm.bind(this);
  }
  valueChange(e) {
    var title = e.target.getAttribute('data-title');
    var value = e.target.value;
    var data = this.props.data;
    data[title] = value;
    this.props.valueChange(data);
  }
  addCategoryCancel(e) {
    this.props.cancel();
    e.preventDefault();
  }
  addCategoryConfirm(e) {
    var name = this.nameInput.value;
    var parent = this.parentSelect.value;
    var descp = this.descpArea.value;
    var data = {
      name: name,
      parent: parent,
      descp: descp
    };
    this.props.confirm(data);
    e.preventDefault();
  }
  render() {
    var data = this.props.data == {} ? {} : this.props.data;
    var name = data.name ? data.name : '';
    var parent = data.parent ? data.parent : '';
    var descp = data.descp ? data.descp : '';
    var categoryItems = this.props.categories.map(category => {
      if (category.id == parent) {
        return React.createElement(
          'option',
          { value: category.id, selected: true },
          category.name
        );
      } else {
        return React.createElement(
          'option',
          { value: category.id },
          category.name
        );
      }
    });
    var styles;
    if (this.props.visible) {
      styles = {
        height: '300px',
        'border-width': '1px',
        opacity: 1
      };
    } else {
      styles = {
        height: '0',
        'border-width': '0',
        opacity: 0
      };
    }
    return React.createElement(
      'div',
      { id: 'add-category-div', style: styles },
      React.createElement(
        'form',
        { id: 'add-category-form' },
        React.createElement(
          'legend',
          { id: 'add-category-div-title' },
          this.props.title
        ),
        React.createElement(
          'li',
          { className: 'add-category-div-item', id: 'add-category-div-name' },
          React.createElement(
            'label',
            { className: 'add-category-div-item-label' },
            '\u6807\u9898'
          ),
          React.createElement('input', { ref: input => {
              this.nameInput = input;
            }, className: 'add-category-div-item-input', id: 'add-category-div-item-input-name', type: 'text', 'data-title': 'name', value: name, onChange: this.valueChange })
        ),
        React.createElement(
          'li',
          { className: 'add-category-div-item', id: 'add-category-div-parent' },
          React.createElement(
            'label',
            { className: 'add-category-div-item-label' },
            '\u7236\u8282\u70B9'
          ),
          React.createElement(
            'select',
            { ref: select => {
                this.parentSelect = select;
              }, className: 'add-category-div-item-input', id: 'add-category-div-item-input-parent', 'data-title': 'parent', onChange: this.valueChange },
            categoryItems
          )
        ),
        React.createElement(
          'li',
          { className: 'add-category-div-item', id: 'add-category-div-descp' },
          React.createElement(
            'label',
            { className: 'add-category-div-item-label' },
            '\u63CF\u8FF0'
          ),
          React.createElement('textarea', { ref: textarea => {
              this.descpArea = textarea;
            }, className: 'add-category-div-item-textarea', id: 'add-category-div-item-input-descp', value: descp, 'data-title': 'descp', onChange: this.valueChange })
        ),
        React.createElement(
          'li',
          { className: 'add-category-div-item add-category-div-opebar' },
          React.createElement(
            'button',
            { className: 'operation-button operation-button-cancel', onClick: this.addCategoryCancel },
            '\u53D6\u6D88'
          ),
          React.createElement(
            'button',
            { className: 'operation-button operation-button-confirm', onClick: this.addCategoryConfirm },
            '\u6DFB\u52A0'
          )
        )
      )
    );
  }
}
class CategoryLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      'tr',
      { className: 'content-row-label category-row-label' },
      React.createElement(
        'th',
        { className: 'category-row-index-label' },
        '\u5E8F\u53F7'
      ),
      React.createElement(
        'th',
        { className: 'category-row-name-label' },
        '\u540D\u79F0'
      ),
      React.createElement(
        'th',
        { className: 'category-row-parent-label' },
        '\u7236\u8282\u70B9'
      ),
      React.createElement(
        'th',
        { className: 'category-row-descp-label' },
        '\u63CF\u8FF0'
      ),
      React.createElement(
        'th',
        { className: 'category-row-order-label' },
        '\u987A\u5E8F'
      ),
      React.createElement(
        'th',
        { className: 'category-row-articlecnt-label' },
        '\u6587\u7AE0\u6570'
      ),
      React.createElement(
        'th',
        { className: 'content-row-operation-label category-row-operation-label' },
        '\u64CD\u4F5C'
      )
    );
  }
}
class CategoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.categoryOperationClick = this.categoryOperationClick.bind(this);
    this.categoryOrderChange = this.categoryOrderChange.bind(this);
    this.categoryOrderKeyDown = this.categoryOrderKeyDown.bind(this);
  }
  categoryOperationClick(e) {
    var type = e.target.getAttribute('data-type');
    var id = e.target.parentNode.getAttribute('data-id');
    if (type == 'modify') {
      this.props.modify(true, 'modify', this.props.category);
    } else if (type == 'delete') {
      this.props.delete(id);
    }
  }
  categoryOrderChange(e) {
    var id = this.props.category.id;
    var order = e.target.value;
    this.props.handleCategoryOrderChange(id, order);
  }
  categoryOrderKeyDown(e) {
    if (e.which == 13) {
      var id = this.props.category.id;
      var order = e.target.value;
      this.props.updateCategoryOrder(id, order);
    }
  }
  render() {
    var category = this.props.category;
    var operationUl = React.createElement(
      'ul',
      { className: 'article-operation-ul', 'data-id': this.props.category.id },
      React.createElement(
        'li',
        { 'data-type': 'modify', onClick: this.categoryOperationClick },
        '\u4FEE\u6539'
      ),
      React.createElement(
        'li',
        { 'data-type': 'delete', onClick: this.categoryOperationClick },
        '\u5220\u9664'
      ),
      React.createElement(
        'li',
        { 'data-type': 'refact' },
        React.createElement(
          'a',
          { href: '/admin/categories/refact/' + category.id },
          '\u91CD\u6784'
        )
      )
    );
    return React.createElement(
      'tr',
      { className: 'content-row-data category-row-data' },
      React.createElement(
        'td',
        { className: 'category-row-index-data' },
        category.id
      ),
      React.createElement(
        'td',
        { className: 'category-row-name-data' },
        React.createElement(
          'a',
          { href: '/articles/category/' + category.id },
          category.name
        )
      ),
      React.createElement(
        'td',
        { className: 'category-row-parent-data' },
        category.parent
      ),
      React.createElement(
        'td',
        { className: 'category-row-descp-data' },
        category.descp
      ),
      React.createElement(
        'td',
        { className: 'category-row-order-data' },
        React.createElement('input', { type: 'number', value: category.mainorder, onChange: this.categoryOrderChange, onKeyDown: this.categoryOrderKeyDown })
      ),
      React.createElement(
        'td',
        { className: 'category-row-articlecnt-data' },
        category.articlecnt
      ),
      React.createElement(
        'td',
        { className: 'content-row-operation-data' },
        operationUl
      )
    );
  }
}
class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var categories = this.props.categories.map(category => React.createElement(CategoryRow, { category: category, modify: this.props.modify, 'delete': this.props.delete, handleCategoryOrderChange: this.props.handleCategoryOrderChange, updateCategoryOrder: this.props.updateCategoryOrder }));
    return React.createElement(
      'table',
      { className: 'content-table category-content-table' },
      React.createElement(
        'thead',
        null,
        React.createElement(CategoryLabel, null)
      ),
      React.createElement(
        'tbody',
        null,
        categories
      ),
      React.createElement('tfoot', null)
    );
  }
}
class CategoryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      addVisible: false,
      addType: 'add',
      addData: {},

      delVisible: false
    };
    this.addTitle = {
      add: '添加类别',
      modify: '修改类别'
    };
    this.addCategoryDivStateChange = this.addCategoryDivStateChange.bind(this);
    this.addCategoryDivValueChange = this.addCategoryDivValueChange.bind(this);
    this.addCategoryDivConfirm = this.addCategoryDivConfirm.bind(this);
    this.addCategoryDivCancel = this.addCategoryDivCancel.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.deleteCategoryConfirm = this.deleteCategoryConfirm.bind(this);
    this.deleteCategoryCancel = this.deleteCategoryCancel.bind(this);
    // category order
    this.handleCategoryOrderChange = this.handleCategoryOrderChange.bind(this);
    this.updateCategoryOrder = this.updateCategoryOrder.bind(this);

    this.fetchCategoryDatas = this.fetchCategoryDatas.bind(this);
    this.fetchCategoryDatas();
  }
  addCategoryDivStateChange(visible, type = this.state.addType, data = {}) {
    this.setState({
      addVisible: visible,
      addType: type,
      addData: data
    });
  }
  addCategoryDivConfirm(data) {
    var url = '';
    if (this.state.addType == 'add') {
      url = '/admin/datas/categories/add';
    } else if (this.props.addType = 'modify') {
      url = '/admin/datas/categories/modify';
      data.id = this.state.addData.id;
    }
    var that = this;
    $.ajax({
      url: url,
      data: data,
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.addCategoryDivStateChange(false);
          that.fetchCategoryDatas();
        }
      }
    });
  }
  addCategoryDivCancel() {
    this.addCategoryDivStateChange(false);
  }
  addCategoryDivValueChange(data) {
    this.setState({
      addData: data
    });
  }
  deleteCategoryConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/delete',
      data: { id: that.state.delCategoryId },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.setState({
            delVisible: false,
            delCategoryId: -1
          });
          that.fetchCategoryDatas();
        }
      }
    });
  }
  deleteCategoryCancel() {
    this.setState({
      delVisible: false
    });
  }
  handleDeleteClick(id) {
    this.setState({
      delVisible: true,
      delCategoryId: id
    });
  }
  handleCategoryOrderChange(id, order) {
    var categories = this.state.categories;
    for (var i in categories) {
      if (categories[i].id == id) {
        categories[i].mainorder = order;
        this.setState({
          categories: categories
        });
        break;
      }
    }
  }
  updateCategoryOrder(id, order) {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/modify',
      data: { id: id, order: order },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.fetchCategoryDatas();
        }
      }
    });
  }
  fetchCategoryDatas() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/get',
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          localStorage.setItem('categories', JSON.stringify(dt.data));
          that.setState({
            categories: dt.data
          });
        }
      }
    });
  }
  render() {
    var categories = this.state.categories;
    var addType = this.state.addType;
    return React.createElement(
      'div',
      null,
      React.createElement(OperationBar, { addNewCategory: this.addCategoryDivStateChange }),
      React.createElement(CategoryTable, { categories: categories, fetchCategoryDatas: this.fetchCategoryDatas, modify: this.addCategoryDivStateChange, 'delete': this.handleDeleteClick, handleCategoryOrderChange: this.handleCategoryOrderChange, updateCategoryOrder: this.updateCategoryOrder }),
      React.createElement(AddCategoryDiv, { type: addType, title: this.addTitle[addType], data: this.state.addData, categories: categories, visible: this.state.addVisible, confirm: this.addCategoryDivConfirm, cancel: this.addCategoryDivCancel, valueChange: this.addCategoryDivValueChange }),
      React.createElement(ConfirmDialog, { title: '\u786E\u8BA4\u5220\u9664\u6B64\u7C7B\u522B?', visible: this.state.delVisible, confirm: this.deleteCategoryConfirm, cancel: this.deleteCategoryCancel })
    );
  }
}
function adminCategoriesInit() {
  ReactDOM.render(React.createElement(CategoryLayout, null), document.getElementById('table-div'));
}
class DetailArea extends React.Component {
  constructor(props) {
    super(props);
    this.articleOrderChange = this.articleOrderChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.prefaceButtonClicked = this.prefaceButtonClicked.bind(this);
  }
  articleOrderChange(e) {
    this.props.orderChange(e.target.value);
  }
  prefaceButtonClicked(e) {
    var type = e.target.getAttribute('data-type');
    var isSet = type == 'set';
    this.props.prefaceChange(this.props.data.id, isSet);
  }
  handleKeyDown(e) {
    if (e.which == 13) {
      this.props.orderChange(e.target.value, true);
    }
  }
  render() {
    var data = this.props.data;
    if (data.id) {
      var opeArea;
      if (data.type == 'dir') {
        opeArea = React.createElement(
          'div',
          { id: 'refact-detail-ope-area' },
          React.createElement(
            'button',
            { id: 'refact-detail-ope-button', className: 'operation-button operation-button-confirm', 'data-type': 'cancel', onClick: this.prefaceButtonClicked },
            '\u53D6\u6D88\u5E8F\u8A00'
          )
        );
      } else {
        opeArea = React.createElement(
          'div',
          { id: 'refact-detail-ope-area' },
          React.createElement(
            'button',
            { id: 'refact-detail-ope-button', className: 'operation-button operation-button-confirm', 'data-type': 'set', onClick: this.prefaceButtonClicked },
            '\u8BBE\u4E3A\u5E8F\u8A00'
          ),
          React.createElement(
            'label',
            { id: 'refact-detail-ope-order-label' },
            '\u5C55\u793A\u987A\u5E8F'
          ),
          React.createElement('input', { id: 'refact-detail-ope-order-input', type: 'number', value: data.suborder, onChange: this.articleOrderChange, onKeyDown: this.handleKeyDown })
        );
      }
      return React.createElement(
        'div',
        { id: 'refact-detail-area' },
        React.createElement(
          'div',
          { id: 'refact-article-brief-area' },
          React.createElement(
            'h1',
            { id: 'refact-article-brief-area-title' },
            data.title
          ),
          React.createElement(
            'div',
            { id: 'refact-article-brief-area-descp' },
            data.descp
          )
        ),
        opeArea
      );
    } else {
      return React.createElement('div', { id: 'refact-detail-area' });
    }
  }
}
class ArticleItemLi extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClicked = this.onItemClicked.bind(this);
  }
  onItemClicked(e) {
    var article = this.props.article;
    this.props.click('art', article.id, this.props.cid);
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      'padding-left': depth * 20 + 20 + 'px'
    };
    var article = this.props.article;
    var articleClass = 'category-tree-article-li';
    if (article.id == this.props.articleId) {
      articleClass += ' category-tree-article-li-current';
    }
    return React.createElement(
      'li',
      { className: articleClass, style: styles, onClick: this.onItemClicked },
      article.title
    );
  }
}
class CategoryItemLi extends React.Component {
  constructor(props) {
    super(props);
    this.expandChange = this.expandChange.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  handleCategoryClick(e) {
    var target = e.target;
    this.props.click('dir', this.props.category.id, this.props.category.id);
  }
  expandChange(e) {
    this.props.expandChange(this.props.category.id);
    e.stopPropagation();
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      'padding-left': depth * 20 + 20 + 'px'
    };
    var category = this.props.category;
    var content = category.childs.map(child => {
      if (child.type == 'art') {
        return React.createElement(ArticleItemLi, { article: child, cid: category.id, articleId: this.props.articleId, depth: depth + 1, click: this.props.click });
      } else {
        return React.createElement(CategoryItemLi, { category: child, categoryId: this.props.categoryId, articleId: this.props.articleId, cstate: this.props.cstate, depth: depth + 1, click: this.props.click, expandChange: this.props.expandChange });
      }
    });
    var titleClass = 'category-tree-category-title';
    if (category.id == this.props.categoryId) {
      titleClass += ' category-tree-category-title-current';
    }
    var articlesUlStyle = {};
    var titleImage = '/images/icons/ic_expand_more_white_24dp_2x.png';
    if (this.props.cstate[category.id] === false) {
      articlesUlStyle.display = 'none';
      titleImage = '/images/icons/ic_expand_less_white_24dp_2x.png';
    }
    return React.createElement(
      'li',
      { className: 'category-tree-category-li' },
      React.createElement(
        'div',
        { className: 'category-tree-category-title-div' },
        React.createElement(
          'span',
          { className: titleClass, onClick: this.handleCategoryClick, style: styles },
          category.title
        ),
        React.createElement('img', { className: 'category-tree-category-title-img', src: titleImage, onClick: this.expandChange })
      ),
      React.createElement(
        'ul',
        { className: 'category-tree-category-ul', style: articlesUlStyle },
        content
      )
    );
  }
}
class CategoryTree extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var tree = this.props.tree;
    if (tree.length) {
      return React.createElement(
        'div',
        { id: 'refact-tree-area' },
        React.createElement(
          'ul',
          { className: 'category-tree-category-ul' },
          React.createElement(CategoryItemLi, { category: this.props.tree[0], categoryId: this.props.categoryId, articleId: this.props.articleId, cstate: this.props.cstate, depth: 0, click: this.props.click, expandChange: this.props.expandChange })
        )
      );
    } else {
      return React.createElement(
        'div',
        null,
        'EMPTY'
      );
    }
  }
}
class ReformArea extends React.Component {
  constructor(props) {
    super(props);
    var cid = Number(location.pathname.match(/\/admin\/categories\/refact\/(\d+)/)[1]);
    this.state = {
      cid: cid,
      tree: [],
      detail: {},
      category: -1,
      article: -1,
      cstate: {} //categoryExpandState
    };
    this.articleOrderChange = this.articleOrderChange.bind(this);
    this.categoryPrefaceChange = this.categoryPrefaceChange.bind(this);
    this.categoryExpandChange = this.categoryExpandChange.bind(this);
    this.__getReactDetail = this.__getReactDetail.bind(this);
    this.getReactDetail = this.getReactDetail.bind(this);
    this.getCategoryTree = this.getCategoryTree.bind(this);
    this.getCategoryTree();
  }
  articleOrderChange(newOrder, update = false) {
    var that = this;
    var id = this.state.detail.id;
    if (update) {
      $.ajax({
        url: '/admin/datas/articles/order',
        data: { id: id, order: newOrder },
        type: 'get',
        dataType: 'json',
        success: function (dt) {
          if (dt.code == 0) {
            that.getCategoryTree();
          }
        }
      });
    } else {
      var detail = this.state.detail;
      detail.suborder = newOrder;
      this.setState({
        detail: detail
      });
    }
  }
  categoryPrefaceChange(id, isSet = true) {
    var that = this;
    var detail = this.state.detail;
    var data = {
      category: this.state.category,
      preface: id,
      isSet: isSet
    };
    $.ajax({
      url: '/admin/datas/categories/preface',
      data: data,
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.getCategoryTree();
        }
      }
    });
  }
  categoryExpandChange(id) {
    var cstate = this.state.cstate;
    cstate[id] = cstate[id] === false;
    this.setState({
      cstate: cstate
    });
  }
  getCategoryTree() {
    var that = this;
    var cid = this.state.cid;
    $.ajax({
      url: '/admin/datas/categories/tree',
      data: { id: cid },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var data = dt.data;
          var root = data[0];
          var tid = that.state.category == -1 ? root.id : that.state.category;
          that.setState({
            tree: data
          });
          that.__getReactDetail('dir', tid, function (dt1) {
            var detail = dt1.code == 0 ? dt1.data : {};
            that.setState({
              detail: detail,
              category: tid
            });
          });
        }
      }
    });
  }
  getReactDetail(type, id, cid) {
    var that = this;
    cid = type == 'dir' ? id : cid;
    this.__getReactDetail(type, id, function (dt) {
      var detail = dt.code == 0 ? dt.data : {};
      var aid = type === 'art' && detail.id ? detail.id : -1;
      that.setState({
        detail: detail,
        category: cid,
        article: aid
      });
    });
  }
  __getReactDetail(type, id, cb) {
    $.ajax({
      url: '/admin/datas/categories/refact/get',
      data: { type: type, id: id },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        cb(dt);
      }
    });
  }
  render() {
    return React.createElement(
      'div',
      { id: 'refact-area' },
      React.createElement(CategoryTree, { tree: this.state.tree, category: this.state.category, categoryId: this.state.category, articleId: this.state.article, cstate: this.state.cstate, click: this.getReactDetail, expandChange: this.categoryExpandChange }),
      React.createElement(DetailArea, { data: this.state.detail, orderChange: this.articleOrderChange, prefaceChange: this.categoryPrefaceChange })
    );
  }
}
function adminCategoryRefactInit() {
  ReactDOM.render(React.createElement(ReformArea, null), document.getElementById('reform-area'));
}
// 这个扩展是从网上复制过来的
Date.prototype.format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  return fmt;
};
class LabelTableLabel extends React.Component {
  constructor(props) {
    super(props);
    this.orderState = {
      asc: {
        label: 'asc',
        imgsrc: '/images/icons/ic_arrow_drop_down_white_24dp_2x.png'
      },
      desc: {
        label: 'desc',
        imgsrc: '/images/icons/ic_arrow_drop_up_white_24dp_2x.png'
      }
    };
    this.handleOrderImgClick = this.handleOrderImgClick.bind(this);
  }
  handleOrderImgClick(e) {
    var orderby = e.target.getAttribute('data-label');
    var orderDirect = this.props.orderDirect == this.orderState.asc.label ? this.orderState.desc.label : this.orderState.asc.label;
    this.props.orderChange(orderby, orderDirect);
  }
  render() {
    var targetsrc, othersrc;
    if (this.props.orderDirect == this.orderState.asc.label) {
      targetsrc = this.orderState.asc.imgsrc;
    } else {
      targetsrc = this.orderState.desc.imgsrc;
    }
    othersrc = this.orderState.asc.imgsrc;
    return React.createElement(
      "tr",
      { className: "content-row-label" },
      React.createElement(
        "th",
        { className: "content-row-index-label label-row-index-label" },
        "\u5E8F\u53F7",
        React.createElement("img", { className: "label-row-hotmark-order-img", src: this.props.orderby == 'id' ? targetsrc : othersrc, "data-label": "id", onClick: this.handleOrderImgClick })
      ),
      React.createElement(
        "th",
        { className: "content-row-title-label label-row-title-label" },
        "\u6807\u9898"
      ),
      React.createElement(
        "th",
        { className: "content-row-article-count-label label-row-articlecnt-label" },
        "\u6587\u7AE0\u6570",
        React.createElement("img", { className: "label-row-hotmark-order-img", src: this.props.orderby == 'id' ? targetsrc : othersrc, "data-label": "articles", onClick: this.handleOrderImgClick })
      ),
      React.createElement(
        "th",
        { className: "content-row-hotmark-label label-row-hotmark-label" },
        "\u70ED\u5EA6",
        React.createElement("img", { className: "label-row-hotmark-order-img", src: this.props.orderby == 'hotmark' ? targetsrc : othersrc, "data-label": "hotmark", onClick: this.handleOrderImgClick })
      ),
      React.createElement(
        "th",
        { className: "content-row-addtime-label label-row-addtime-label" },
        "\u6DFB\u52A0\u65E5\u671F"
      )
    );
  }
}
class LabelRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const label = this.props.label;
    var addtime = new Date(label.addtime * 1000).format('yyyy-MM-dd');
    return React.createElement(
      "tr",
      { className: "content-row-data" },
      React.createElement(
        "td",
        { className: "content-row-index-data" },
        label.id
      ),
      React.createElement(
        "td",
        { className: "content-row-title-data label-row-title-data" },
        React.createElement(
          "a",
          { href: '/articles/search?args=' + label.name },
          label.name
        )
      ),
      React.createElement(
        "td",
        { className: "content-row-article-count-data" },
        label.articles
      ),
      React.createElement(
        "td",
        { className: "content-row-hotmark-data" },
        label.hotmark
      ),
      React.createElement(
        "td",
        { className: "content-row-addtime-data" },
        addtime
      )
    );
  }
}
class LabelTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const labels = this.props.labels.map(label => React.createElement(LabelRow, { label: label }));
    return React.createElement(
      "table",
      { className: "content-table" },
      React.createElement(
        "thead",
        null,
        React.createElement(LabelTableLabel, { orderby: this.props.orderby, orderDirect: this.props.orderDirect, orderChange: this.props.orderChange })
      ),
      React.createElement(
        "tbody",
        null,
        labels
      ),
      React.createElement("tfoot", null)
    );
  }
}
class LabelLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      total: 0,
      orderby: 'id',
      orderDirect: 'asc',
      labels: []
    };
    this.filter = { start: 0 };
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchLabelData = this.fetchLabelData.bind(this);
    this.fetchLabelData(this.state.orderby, this.state.orderDirect);
  }
  handlePageChange(i) {
    this.filter.start = i;
    this.fetchLabelData();
  }
  handleOrderChange(orderby, orderDirect) {
    this.filter.start = 0;
    this.fetchLabelData(orderby, orderDirect);
  }
  fetchLabelData(orderby, orderDirect) {
    var that = this;
    var data = {
      start: this.filter.start,
      orderby: orderby,
      asc: orderDirect
    };
    $.ajax({
      url: '/admin/datas/labels/get',
      data: data,
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var returnData = dt.data;
          that.setState({
            current: returnData.current,
            total: returnData.total,
            orderby: orderby,
            orderDirect: orderDirect,
            labels: returnData.data
          });
        }
      }
    });
  }
  render() {
    return React.createElement(
      "div",
      { id: "label-table-div" },
      React.createElement(LabelTable, { labels: this.state.labels, orderby: this.state.orderby, orderDirect: this.state.orderDirect, orderChange: this.handleOrderChange }),
      React.createElement(TableNavLink, { page: this.state.current, total: this.state.total, pagechange: this.handlePageChange })
    );
  }
}
function adminLabelsInit() {
  ReactDOM.render(React.createElement(LabelLayout, null), document.getElementById('table-div'));
}
class InputDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleConfirmClick() {
    var val = this.textInput.value;
    this.props.confirm(val);
    this.textInput.value = "";
  }
  handleCancelClick() {
    this.props.cancel();
  }
  handleKeyDown(e) {
    if (e.which == 13) {
      this.handleConfirmClick();
    }
  }
  render() {
    var styles = {};
    if (!this.props.visible) styles.display = 'none';
    return React.createElement(
      'div',
      { className: 'dialog-div input-dialog', style: styles },
      React.createElement(
        'div',
        { className: 'dialog-header-div' },
        React.createElement(
          'div',
          { className: 'dialog-title-div' },
          this.props.title
        )
      ),
      React.createElement(
        'div',
        { className: 'dialog-main-body-div' },
        React.createElement('input', { className: 'dialog-content-input', ref: input => this.textInput = input, onKeyDown: this.handleKeyDown })
      ),
      React.createElement(
        'div',
        { className: 'dialog-buttom-operation-bar' },
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-confirm-button', onClick: this.handleConfirmClick },
          '\u786E\u5B9A'
        ),
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-cancel-button', onClick: this.handleCancelClick },
          '\u53D6\u6D88'
        )
      )
    );
  }
}

class MovePhotoGroupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.state = {
      newgroup: -1
    };
  }

  handleConfirmClick(e) {
    this.props.confirm(this.state.newgroup);
  }

  handleCancelClick(e) {
    this.props.cancel();
  }

  handleGroupChange(e) {
    var radio = e.target;
    if (radio.checked) {
      this.setState({
        newgroup: radio.value
      });
    }
  }

  render() {
    var styles = {},
        groups = [];
    if (!this.props.visible) styles.display = 'none';
    if (localStorage.getItem('photo_group')) {
      groups = JSON.parse(localStorage.getItem("photo_group"));
    }
    var groupItems = groups.map(group => {
      if (group.id == -1) return '';
      return React.createElement(
        'li',
        { className: 'move-group-radio-li' },
        React.createElement('input', { type: 'radio', name: 'photogroup', value: group.id, onChange: this.handleGroupChange }),
        React.createElement(
          'label',
          null,
          group.name
        )
      );
    });
    return React.createElement(
      'div',
      { className: 'dialog-div option-dialog', style: styles },
      React.createElement(
        'div',
        { className: 'dialog-main-body-div' },
        React.createElement(
          'ul',
          { id: 'move-group-radio-ul' },
          groupItems
        )
      ),
      React.createElement(
        'div',
        { className: 'dialog-bottom-operation-bar' },
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-confirm-button', onClick: this.handleConfirmClick },
          '\u786E\u5B9A'
        ),
        React.createElement(
          'button',
          { className: 'dialog-operation-button dialog-cancel-button', onClick: this.handleCancelClick },
          '\u53D6\u6D88'
        )
      )
    );
  }
}

class PhotoFlowOperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveVisible: false,
      delVisible: false
    };
    this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
    this.handleUploadInputChange = this.handleUploadInputChange.bind(this);

    // Dialog Visibility
    this.hideMoveDialog = this.hideMoveDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
    // MoveDialog
    this.handleMoveConfirm = this.handleMoveConfirm.bind(this);
    this.handleMoveCancel = this.handleMoveCancel.bind(this);
    // DeleteDialog
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handleDelCancel = this.handleDelCancel.bind(this);
    // button action
    this.moveButtonClick = this.moveButtonClick.bind(this);
    this.delButtonClick = this.delButtonClick.bind(this);
    // all-check
    this.handleAllCheckChanged = this.handleAllCheckChanged.bind(this);
  }

  handleUploadButtonClick(e) {
    var input = this.uploadInput;
    input.click();
  }

  handleUploadInputChange(e) {
    this.props.handleUploadInputChange(e);
  }

  hideMoveDialog() {
    this.setState({
      moveVisible: false
    });
  }

  hideDelDialog() {
    this.setState({
      delVisible: false
    });
  }

  handleMoveConfirm(new_gid) {
    this.props.handleMoveChecked(new_gid);
    this.hideMoveDialog();
  }

  handleMoveCancel() {
    this.hideMoveDialog();
  }

  handleDelConfirm() {
    this.props.handleDeleteChecked();
    this.hideDelDialog();
  }

  handleDelCancel() {
    this.hideDelDialog();
  }

  moveButtonClick() {
    this.setState({
      moveVisible: true
    });
  }

  delButtonClick() {
    this.setState({
      delVisible: true
    });
  }

  handleAllCheckChanged(e) {
    var allChecked = e.target.checked;
    this.props.handleAllCheckChanged(allChecked);
  }
  render() {
    var uploadInputStyles = {
      display: 'none'
    };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'photo-operation-bar', id: 'photo-operation-bar-first' },
        React.createElement(
          'button',
          { id: 'upload-image-button', className: 'operation-button', onClick: this.handleUploadButtonClick },
          '\u4E0A\u4F20\u56FE\u7247'
        ),
        React.createElement('input', { ref: input => {
            this.uploadInput = input;
          }, id: 'upload-image-input', type: 'file', accept: 'image/*', style: uploadInputStyles, onChange: this.handleUploadInputChange })
      ),
      React.createElement(
        'div',
        { className: 'photo-operation-bar', id: 'photo-operation-bar-second' },
        React.createElement('input', { type: 'checkbox', onChange: this.handleAllCheckChanged }),
        React.createElement(
          'label',
          null,
          '\u5168\u9009'
        ),
        React.createElement(
          'div',
          { id: 'photo-flow-opebar-move-div' },
          React.createElement(
            'button',
            { id: 'photo-flow-opebar-move-button', className: 'operation-button operation-button-confirm', onClick: this.moveButtonClick },
            '\u79FB\u52A8\u5206\u7EC4'
          ),
          React.createElement(MovePhotoGroupDialog, { confirm: this.handleMoveConfirm, cancel: this.handleMoveCancel, visible: this.state.moveVisible })
        ),
        React.createElement(
          'div',
          { id: 'photo-flow-opebar-del-div' },
          React.createElement(
            'button',
            { id: 'photo-flow-opebar-del-button', className: 'operation-button operation-button-cancel', onClick: this.delButtonClick },
            '\u5220\u9664'
          ),
          React.createElement(ConfirmDialog, { title: '\u786E\u8BA4\u5220\u9664?', confirm: this.handleDelConfirm, cancel: this.handleDelCancel, visible: this.state.delVisible })
        )
      )
    );
  }
}

class PhotoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // config for InputDialog (edit)
      inputVisible: false,
      // config for MoveDialog 
      moveVisible: false,
      // config for DelDialog
      delVisible: false
    };
    this.handlePhotoCheck = this.handlePhotoCheck.bind(this);
    //Dialog Visibility
    this.showInputDialog = this.showInputDialog.bind(this);
    this.hideInputDialog = this.hideInputDialog.bind(this);
    this.showMoveDialog = this.showMoveDialog.bind(this);
    this.hideMoveDialog = this.hideMoveDialog.bind(this);
    this.showDelDialog = this.showDelDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
    // InputDialog
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.handleInputCancel = this.handleInputCancel.bind(this);
    // MoveDialog
    this.handleMoveConfirm = this.handleMoveConfirm.bind(this);
    this.handleMoveCancel = this.handleMoveCancel.bind(this);
    // DeleteDialog
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handleDelCancel = this.handleDelCancel.bind(this);
    this.photoOnLoad = this.photoOnLoad.bind(this);
  }
  handlePhotoCheck(e) {
    this.props.handleCheckChange(e.target.value, e.target.checked);
  }
  showInputDialog(e) {
    this.setState({
      inputVisible: true
    });
  }
  hideInputDialog(e) {
    this.setState({
      inputVisible: false
    });
  }
  showMoveDialog(e) {
    this.setState({
      moveVisible: true
    });
  }
  showDelDialog(e) {
    this.setState({
      delVisible: true
    });
  }
  hideDelDialog(e) {
    this.setState({
      delVisible: false
    });
  }
  hideMoveDialog(e) {
    this.setState({
      moveVisible: false
    });
  }
  handleInputConfirm(name) {
    this.props.rename(this.props.photo.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleMoveConfirm(new_gid) {
    this.props.movegroup(this.props.photo.id, new_gid);
    this.hideMoveDialog();
  }
  handleMoveCancel() {
    this.hideMoveDialog();
  }
  handleDelConfirm() {
    this.props.delphoto(this.props.photo.id);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  photoOnLoad(e) {
    var img = e.target;
    var a = new Image();
    a.src = img.src;
    var sw = a.width;
    var sh = a.height;
    var min = sw < sh ? sw : sh;
    var scale = min / 200;
    var nw = sw / scale;
    var nh = sh / scale;
    img.style.width = nw + 'px';
    img.style.height = nh + 'px';
  }
  render() {
    var photoSrc = '/images/blog/' + this.props.photo.name;
    var checked = this.props.checked ? "checked" : "";
    return React.createElement(
      'li',
      { className: 'photo-flow-item-li' },
      React.createElement(
        'div',
        { className: 'photo-flow-item-li-img-div' },
        React.createElement('img', { className: 'photo-flow-item-li-img', src: photoSrc, onLoad: this.photoOnLoad })
      ),
      React.createElement(
        'div',
        { className: 'photo-flow-item-name-div' },
        React.createElement('input', { className: 'photo-flow-item-name-checkbox', type: 'checkbox', value: this.props.photo.id, checked: checked, onChange: this.handlePhotoCheck }),
        React.createElement(
          'span',
          { className: 'photo-flow-item-name-span' },
          this.props.photo.title
        )
      ),
      React.createElement(
        'div',
        { className: 'photo-flow-item-li-ope-bar' },
        React.createElement('li', { className: 'photo-flow-item-ope-img photo-flow-item-mode-edit', onClick: this.showInputDialog }),
        React.createElement('li', { className: 'photo-flow-item-ope-img photo-flow-item-mode-swap', onClick: this.showMoveDialog }),
        React.createElement('li', { className: 'photo-flow-item-ope-img photo-flow-item-mode-del', onClick: this.showDelDialog })
      ),
      React.createElement(InputDialog, { title: '\u7F16\u8F91\u540D\u79F0', confirm: this.handleInputConfirm, cancel: this.handleInputCancel, visible: this.state.inputVisible }),
      React.createElement(MovePhotoGroupDialog, { confirm: this.handleMoveConfirm, cancel: this.handleMoveCancel, visible: this.state.moveVisible }),
      React.createElement(ConfirmDialog, { title: '\u786E\u8BA4\u5220\u9664?', confirm: this.handleDelConfirm, cancel: this.handleDelCancel, visible: this.state.delVisible })
    );
  }
}

class PhotoFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      // 这个状态需要同步 😊 
      checkState: {},
      start: 0 };
    this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);

    // all-check checkbox
    this.handleAllCheckChanged = this.handleAllCheckChanged.bind(this);
    this.handleDeleteChecked = this.handleDeleteChecked.bind(this);
    this.handleMoveChecked = this.handleMoveChecked.bind(this);

    this.moveGroup = this.moveGroup.bind(this);
    this.moveSingleGroup = this.moveSingleGroup.bind(this);
    this.renamePhoto = this.renamePhoto.bind(this);
    this.deletePhotos = this.deletePhotos.bind(this);
    this.deleteSinglePhoto = this.deleteSinglePhoto.bind(this);
    this.getSinglePhoto = this.getSinglePhoto.bind(this);
    this.getGroupPhotos = this.getGroupPhotos.bind(this);
    this.getGroupPhotos();
  }

  handleAllCheckChanged(checked) {
    var checkState = this.state.checkState;
    this.state.photos.forEach(photo => {
      checkState[photo.id] = checked;
    });
    this.setState({
      checkState: checkState
    });
  }

  deletePhotos(ids) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/delete',
      data: { photos: ids },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        that.props.handleRefetch();
      }
    });
  }

  deleteSinglePhoto(id) {
    this.deletePhotos([id].join(','));
  }

  handleDeleteChecked() {
    var ids = [];
    for (let id in this.state.checkState) {
      if (this.state.checkState[id]) {
        ids.push(id);
      }
    }
    this.deletePhotos(ids);
  }

  moveGroup(ids, new_gid) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/move',
      data: { photos: ids, gid: new_gid },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.props.handleRefetch();
        }
      }
    });
  }

  moveSingleGroup(id, new_gid) {
    this.moveGroup([id].join(','), new_gid);
  }

  handleMoveChecked(new_gid) {
    var ids = [];
    for (let id in this.state.checkState) {
      if (this.state.checkState[id]) {
        ids.push(id);
      }
    }
    this.moveGroup(ids.join(','), new_gid);
  }

  // 上传图片
  handleUploadInputChange(e) {
    var that = this;
    var input = e.target;
    var file = input.files[0];
    var fd = new FormData();
    fd.append('file', file);
    fd.append('gid', this.props.gid);
    $.ajax({
      url: '/admin/datas/photos/add',
      data: fd,
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        that.props.handleRefetch();
      },
      error: function (err) {
        console.log('error');
      }
    });
  }

  renamePhoto(id, name) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/rename',
      data: { id: id, title: name },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.getSinglePhoto(id);
        }
      }
    });
  }

  getSinglePhoto(id) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/get',
      data: { id: id },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var photos = that.state.photos;
          for (let index in photos) {
            if (photos[index].id == id) {
              photos[index] = dt.data[0];
              that.setState({
                photos: photos
              });
              break;
            }
          }
        }
      }
    });
  }
  /**
   * 这里在 photo flow 中添加、移动、删除时不能更新
   */
  getGroupPhotos() {
    var that = this;
    // this or that 😊 在函数参数中，待查
    $.ajax({
      url: '/admin/datas/photos/get',
      data: { gid: this.props.gid },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.setState({
            photos: dt.data,
            checkState: {}
          });
        }
      }
    });
  }

  handleCheckChange(id, checked) {
    var checkState = this.state.checkState;
    checkState[id] = checked;
    this.setState({
      checkState: checkState
    });
  }

  render() {
    const items = this.state.photos.map(photo => {
      var checked = this.state.checkState[photo.id] ? true : false;
      return React.createElement(PhotoItem, { photo: photo, rename: this.renamePhoto, movegroup: this.moveSingleGroup, delphoto: this.deleteSinglePhoto, handleCheckChange: this.handleCheckChange, checked: checked });
    });
    return React.createElement(
      'div',
      { id: 'photo-flow-div' },
      React.createElement(PhotoFlowOperationBar, { handleUploadInputChange: this.handleUploadInputChange, handleAllCheckChanged: this.handleAllCheckChanged, handleDeleteChecked: this.handleDeleteChecked, handleMoveChecked: this.handleMoveChecked }),
      React.createElement(
        'ul',
        { id: 'photo-flow-items-ul' },
        items
      )
    );
  }
}

class PhotoGroupItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      delVisible: false
    };
    // Dialog Visibility
    this.showInputDialog = this.showInputDialog.bind(this);
    this.hideInputDialog = this.hideInputDialog.bind(this);
    this.showDelDialog = this.showDelDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
    // Dialog action
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.handleInputCancel = this.handleInputCancel.bind(this);
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handleDelCancel = this.handleDelCancel.bind(this);
    this.handleGroupItemClick = this.handleGroupItemClick.bind(this);
    // Self-Owned action
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleRenameGroup = this.handleRenameGroup.bind(this);
  }
  showInputDialog() {
    this.setState({
      inputVisible: true
    });
  }
  hideInputDialog() {
    this.setState({
      inputVisible: false
    });
  }
  showDelDialog() {
    this.setState({
      delVisible: true
    });
  }
  hideDelDialog() {
    this.setState({
      delVisible: false
    });
  }
  handleInputConfirm(name) {
    var gid = this.props.group.id;
    this.props.handleRenameGroup(gid, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleDelConfirm() {
    var gid = this.props.group.id;
    this.props.handleDeleteGroup(gid);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  handleGroupItemClick(e) {
    var gid = this.props.group.id;
    this.props.handleGroupItemClick(gid);
    e.stopPropagation();
  }
  handleDeleteGroup(e) {
    this.showDelDialog();
  }
  handleRenameGroup(e) {
    this.showInputDialog();
    e.stopPropagation();
  }
  render() {
    var opeImgStyles = {};
    if (!this.props.opeImgVisible) {
      opeImgStyles.display = 'none';
    }
    var group = this.props.group;
    var gid = group.id;
    var classes = 'photo-group-item-li';
    if (gid == this.props.gid) classes += ' photo-group-item-li-current';
    var imgSrc = '/images/icons/ic_close_black_24dp_2x.png';
    if (gid < 2) {
      return React.createElement(
        'li',
        { className: classes },
        React.createElement(
          'span',
          { className: 'photo-group-item-li-title-span', 'data-gid': group.id, onClick: this.handleGroupItemClick },
          group.name,
          '(',
          group.count,
          ')'
        )
      );
    }
    return React.createElement(
      'li',
      { className: classes },
      React.createElement(
        'span',
        { className: 'photo-group-item-li-title-span', onClick: this.handleGroupItemClick },
        group.name,
        '(',
        group.count,
        ')'
      ),
      React.createElement('img', { className: 'photo-group-item-li-ope-img', src: '/images/icons/ic_mode_edit_black_24dp_2x.png', style: opeImgStyles, onClick: this.handleRenameGroup }),
      React.createElement('img', { className: 'photo-group-item-li-ope-img', src: '/images/icons/ic_close_black_24dp_2x.png', style: opeImgStyles, onClick: this.handleDeleteGroup }),
      React.createElement(InputDialog, { title: '\u7F16\u8F91\u540D\u79F0', confirm: this.handleInputConfirm, cancel: this.handleInputCancel, visible: this.state.inputVisible }),
      React.createElement(ConfirmDialog, { title: '\u786E\u8BA4\u5220\u9664?', confirm: this.handleDelConfirm, cancel: this.handleDelCancel, visible: this.state.delVisible })
    );
  }
}

class PhotoGroupBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: this.props.groups,
      addVisible: false,
      opeImgVisible: false
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleGroupItemClick = this.handleGroupItemClick.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
    this.fetchGroupData = this.fetchGroupData.bind(this);
    this.toggleOpeImgState = this.toggleOpeImgState.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleRenameGroup = this.handleRenameGroup.bind(this);

    this.fetchGroupData();
  }

  showAddDialog() {
    this.setState({
      addVisible: true
    });
  }

  fetchGroupData() {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/get',
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          localStorage.setItem('photo_group', JSON.stringify(dt.data));
          that.setState({
            groups: dt.data
          });
        }
      }
    });
  }

  handleConfirm(groupname) {
    this.setState({
      addVisible: false
    });
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/modify',
      data: { groupname: groupname },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        that.fetchGroupData();
      },
      error: function () {
        console.log('error');
      }
    });
  }

  handleCancel() {
    this.setState({
      addVisible: false
    });
  }

  handleGroupItemClick(gid) {
    this.props.groupChange(gid);
  }

  handleDeleteGroup(gid) {
    console.log('gid: ' + gid);
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/remove',
      data: { gid: gid },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        console.log(JSON.stringify(dt));
        if (dt.code == 0) {
          if (gid == that.props.gid) {
            that.props.groupChange(-1);
          } else {
            that.fetchGroupData();
          }
        }
      }
    });
  }

  handleRenameGroup(gid, name) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/rename',
      data: { gid: gid, name: name },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.fetchGroupData();
        }
      }
    });
  }

  toggleOpeImgState() {
    this.setState(function (previous, props) {
      return {
        opeImgVisible: !previous.opeImgVisible
      };
    });
  }

  render() {
    var opebarImg = this.state.opeImgVisible ? '/images/icons/ic_cancel_black_24dp_2x.png' : '/images/icons/ic_arrow_drop_down_circle_black_24dp_2x.png';
    var groupItems = this.state.groups.map(group => React.createElement(PhotoGroupItem, { group: group, gid: this.props.gid, opeImgVisible: this.state.opeImgVisible, handleGroupItemClick: this.handleGroupItemClick, handleDeleteGroup: this.handleDeleteGroup, handleRenameGroup: this.handleRenameGroup }));
    var key = new Date().getTime();
    return React.createElement(
      'div',
      { id: 'photo-group-div' },
      React.createElement(
        'div',
        { className: 'photo-group-operation-bar' },
        React.createElement(
          'div',
          { id: 'add-new-photo-group-div', onClick: this.showAddDialog },
          '\u65B0\u5EFA\u5206\u7EC4'
        ),
        React.createElement(InputDialog, { title: '\u65B0\u5EFA\u5206\u7EC4', confirm: this.handleConfirm, cancel: this.handleCancel, visible: this.state.addVisible })
      ),
      React.createElement(
        'div',
        { className: 'photo-group-operation-bar' },
        React.createElement(
          'div',
          { id: 'photo-group-opebar-title-div' },
          '\u56FE\u7247\u7EC4'
        ),
        React.createElement('img', { id: 'photo-group-opebar-img', src: opebarImg, onClick: this.toggleOpeImgState })
      ),
      React.createElement(
        'ul',
        { id: 'photo-group-items-ul' },
        groupItems
      )
    );
  }
}
class PhotoArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gid: -1,
      key: new Date().getTime()
    };
    this.handlePhotoGroupChange = this.handlePhotoGroupChange.bind(this);
    this.handleRefetch = this.handleRefetch.bind(this);
  }
  handlePhotoGroupChange(gid) {
    this.setState({
      gid: gid,
      key: new Date().getTime()
    });
  }
  handleRefetch() {
    this.setState({
      key: new Date().getTime()
    });
  }
  /**
   * 原本想把这个函数封进PhotoFlow 中
   * 但没有找到合适的更新方法
   * 暂且用 key 来更新
   * 以后再看一看有没有更好的方法
   * 现在这个做个记号😊 🔥 
   * 以示可以在这里拉取数据
   * 然后作为 PhotoFlow 的 props 传入
   * 这样封装性不太好
   */
  getGroupPhotos() {}
  render() {
    var groups = [];
    return React.createElement(
      'div',
      { id: 'photo-div' },
      React.createElement(PhotoFlow, { key: this.state.key, gid: this.state.gid, handleRefetch: this.handleRefetch }),
      React.createElement(PhotoGroupBar, { key: this.state.key + 100, gid: this.state.gid, groups: groups, groupChange: this.handlePhotoGroupChange, handleRefetch: this.handleRefetch })
    );
  }
}
function adminPhotosInit() {
  ReactDOM.render(React.createElement(PhotoArea, null), document.getElementById('photos-target-div'));
}
//# sourceMappingURL=all.js.map
