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
    this.props.click('art', article.id, this.props.cid);
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
    this.props.click('dir', this.props.category.id, this.props.category.id);
  }
  expandChange(e) {
    this.props.expandChange(this.props.category.id);
    e.stopPropagation();
  }
  render() {
    var depth = this.props.depth;
    var styles = {
      'padding-left': (depth * 20 + 20) + 'px'
    }
    var category = this.props.category;
    var content = category.childs.map((child) => {
      if (child.type == 'art') {
        return <ArticleItemLi article = {child} cid = {category.id} articleId = {this.props.articleId} depth = {depth + 1} click = {this.props.click} />
      } else {
        return <CategoryItemLi category = {child}  categoryId = {this.props.categoryId} articleId = {this.props.articleId} cstate = {this.props.cstate} depth = {depth + 1} click = {this.props.click} expandChange = {this.props.expandChange} />
      }
    })
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
            <CategoryItemLi category = {this.props.tree[0]} categoryId = {this.props.categoryId} articleId = {this.props.articleId} cstate = {this.props.cstate} depth = {0} click = {this.props.click} expandChange = {this.props.expandChange} />
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
    var cid = Number(location.pathname.match(/\/admin\/categories\/refact\/(\d+)/)[1]);
    this.state = {
      cid: cid,
      tree: [],
      detail: {},
      category: -1,
      article: -1,
      cstate: {}  //categoryExpandState
    }
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
        data: {id: id, order: newOrder},
        type: 'get',
        dataType: 'json',
        success: function(dt) {
          if (dt.code == 0) {
            that.getCategoryTree();
          }
        }
      })
    } else {
      var detail = this.state.detail;
      detail.suborder = newOrder;
      this.setState({
        detail: detail
      })
    }
  }
  categoryPrefaceChange(id, isSet = true) {
    var that = this;
    var detail = this.state.detail;
    var data = {
      category: this.state.category,
      preface: id,
      isSet: isSet
    }
    $.ajax({
      url: '/admin/datas/categories/preface',
      data: data,
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.getCategoryTree();
        }
      }
    })
  }
  categoryExpandChange(id) {
    var cstate = this.state.cstate;
    cstate[id] = cstate[id] === false;
    this.setState({
      cstate: cstate
    })
  }
  getCategoryTree() {
    var that = this;
    var cid = this.state.cid;
    $.ajax({
      url: '/admin/datas/categories/tree',
      data: {id: cid},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          var data = dt.data;
          var root = data[0];
          var tid = that.state.category == -1 ? root.id : that.state.category;
          that.setState({
            tree: data
          })
          that.__getReactDetail(
            'dir',
            tid,
            function(dt1) {
              var detail = dt1.code == 0 ? dt1.data : {};
              that.setState({
                detail: detail,
                category: tid,
              })
            }
          )
        }
      }
    })
  }
  getReactDetail(type, id, cid) {
    var that = this;
    cid = type == 'dir' ? id : cid;
    this.__getReactDetail(type, id, function(dt) {
      var detail = dt.code == 0 ? dt.data : {};
      var aid = (type === 'art' && detail.id) ? detail.id : -1;
      that.setState({
        detail: detail,
        category: cid,
        article: aid
      })
    });
  }
  __getReactDetail(type, id, cb) {
    $.ajax({
      url: '/admin/datas/categories/refact/get',
      data: {type: type, id: id},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        cb(dt);
      }
    })
  }
  render() {
    return (
      <div id = 'refact-area'>
        <CategoryTree tree = {this.state.tree} category = {this.state.category} categoryId = {this.state.category} articleId = {this.state.article} cstate = {this.state.cstate} click = {this.getReactDetail} expandChange = {this.categoryExpandChange} />
        <DetailArea data = {this.state.detail} orderChange = {this.articleOrderChange} prefaceChange = {this.categoryPrefaceChange} />
      </div>
    )
  }
}

module.exports = CategoryRefactArea;