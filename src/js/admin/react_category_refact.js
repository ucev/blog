const React = require('react');
const ReactDOM = require('react-dom');

const CategoryRefactActions = require('../actions/actions_category_refact');
const CategoryRefactStore = require('../stores/stores_category_refact');

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
    CategoryRefactActions.categoryPrefaceChange(this.props.data.id, isSet);
  }
  handleKeyDown(e) {
    if (e.which == 13) {
      CategoryRefactActions.articleOrderChange(e.target.value, true);
    }
  }
  render() {
    var data = this.props.data;
    if (data.id) {
      var opeArea;
      if (data.type == 'dir') {
        opeArea = (
          <div id = 'refact-detail-ope-area'>
            <button id = 'refact-detail-ope-button' className = 'operation-button operation-button-confirm' data-type = 'cancel' onClick = {this.prefaceButtonClicked} >取消序言</button>
          </div>
        )
      } else {
        opeArea = (
          <div id = 'refact-detail-ope-area'>
            <button id = 'refact-detail-ope-button' className = 'operation-button operation-button-confirm' data-type = 'set' onClick = {this.prefaceButtonClicked} >设为序言</button>
            <label id = 'refact-detail-ope-order-label'>展示顺序</label><input id = 'refact-detail-ope-order-input' type = 'number' value = {data.suborder} onChange = {this.articleOrderChange} onKeyDown = {this.handleKeyDown} />
          </div>
        )
      }
      return (
        <div id = 'refact-detail-area'>
          <div id = 'refact-article-brief-area'>
            <h1 id = 'refact-article-brief-area-title'>{data.title}</h1>
            <div id = 'refact-article-brief-area-descp'>{data.descp}</div>
          </div>
          {opeArea}
        </div>
      )
    } else {
      return (
        <div id = 'refact-detail-area'></div>
      )
    }
  }
}

class ArticleItemLi extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClicked = this.onItemClicked.bind(this);
  }
  onItemClicked (e) {
    var article = this.props.article;
    CategoryRefactActions.getRefactDetail('art', article.id, this.props.cid);
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      'padding-left': (depth * 20 + 20) + 'px'
    }
    var article = this.props.article;
    var articleClass = 'category-tree-article-li';
    if (article.id == this.props.articleId) {
      articleClass += ' category-tree-article-li-current';
    }
    return <li className = {articleClass} style = {styles} onClick = {this.onItemClicked} >{article.title}</li>
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
    CategoryRefactActions.getRefactDetail('dir', this.props.category.id, this.props.category.id);
  }
  expandChange(e) {
    CategoryRefactActions.categoryExpandChange(this.props.category.id);
    e.stopPropagation();
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      'padding-left': (depth * 20 + 20) + 'px'
    }
    var category = this.props.category;
    var content;
    if (category.childs) {
      var content = category.childs.map((child) => {
        if (child.type == 'dir') {
          return <CategoryItemLi category = {child}  categoryId = {this.props.categoryId} articleId = {this.props.articleId} cstate = {this.props.cstate} depth = {depth + 1}/>
        } else {
          return <ArticleItemLi article = {child} cid = {category.id} articleId = {this.props.articleId} depth = {depth + 1}/>
        }
      })
    }
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
    return (
      <li className = 'category-tree-category-li'>
        <div className = 'category-tree-category-title-div'>
          <span className = {titleClass} onClick = {this.handleCategoryClick} style = {styles}>{category.title}</span>
          <img className = 'category-tree-category-title-img' src = {titleImage} onClick = {this.expandChange}></img>
        </div>
        <ul className = 'category-tree-category-ul' style = {articlesUlStyle}>
          {content}
        </ul>
      </li>
    )
  }
}

class CategoryTree extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var tree = this.props.tree;
    if (tree.length) {
      return (
        <div id = 'refact-tree-area'>
          <ul className = 'category-tree-category-ul'>
            <CategoryItemLi category = {this.props.tree[0]} categoryId = {this.props.categoryId} articleId = {this.props.articleId} cstate = {this.props.cstate} depth = {0}/>
          </ul>
        </div>
      );
    } else {
      return <div>EMPTY</div>
    }
  }
}

class CategoryRefactArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = CategoryRefactStore.getAll();
    this.__onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    CategoryRefactStore.addChangeListener(this.__onChange);
    CategoryRefactActions.getCategoryTree();
  }
  componentWillUnmount() {
    CategoryRefactStore.removeChangeListener(this.__onChange);
  }
  __onChange() {
    this.setState(CategoryRefactStore.getAll());
  }
  render() {
    return (
      <div id = 'refact-area'>
        <CategoryTree tree = {this.state.tree} category = {this.state.category} categoryId = {this.state.category} articleId = {this.state.article} cstate = {this.state.cstate}/>
        <DetailArea data = {this.state.detail}/>
      </div>
    )
  }
}

module.exports = CategoryRefactArea;