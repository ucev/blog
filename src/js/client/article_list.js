const React = require('react');
const ReactDOM = require('react-dom');
// 这个扩展是从网上复制过来的
Date.prototype.format = function (fmt) { //author: meizz
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
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var article = this.props.article;
    return (
      <li className = 'article-item-li' date-id = {article.id}>
        <h3 className = 'article-item-li-title'>
          <a href = {'/articles/view/' + article.id}>{article.title}</a>
        </h3>
        <div className = 'article-item-li-content'>{article.descp}</div>
        <div className = 'article-item-li-bottom-info'>
          <span className = 'article-item-li-pageview'>阅读量{article.pageview}</span>
          <span className = 'article-item-li-addtime'>{new Date(Number(article.modtime) * 1000).format('yyyy-MM-dd hh:mm:ss')}</span>
        </div>
      </li>
    )
  }
}

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var articles = this.props.articles.map((article) => {
      return <ArticleItem key = {article.id} article = {article} />;
    })
    return (
      <ul id = 'articles-list-ul'>
        {articles}
      </ul>
    )
  }
}

class QueryDataDiv extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    console.log('more1');
    this.props.more();
  }
  render() {
    var visible = this.props.visible;
    var styles = {};
    if (!visible) {
      styles['display'] = 'none';
    }
    return (
      <div>
        <div className = 'load-more-div' style = {styles} onClick = {this.loadMore}>继续加载</div>
      </div>
    )
  }
}

class ArticleDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      current: 0,
      articles: []
    }
    this.getArticleData = this.getArticleData.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getArticleData();
  }
  loadMore() {
    console.log('more2');
    this.getArticleData(false);
  }
  /**
   * 
   * @param {*} replace 
   * replace -- where replace `articles` state
   */
  getArticleData(replace = false) {
    var that = this;
    $.ajax({
      url: '/articles/data/articles/get?start=' + that.state.current,
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          var data = dt.data;
          console.log('total: ' + data.total + ', current: ' + data.current);
          var articles = that.state.articles;
          if (replace === true) {
            articles = data.data;
          } else {
            articles = articles.concat(data.data);
          }
          that.setState({
            total: Number(data.total),
            current: Number(data.current) + 1,
            articles: articles
          })
        }
      }
    })
  }
  render() {
    var addMoreVisible = this.state.total > this.state.current;
    return (
      <div>
        <ArticleList key = {1} articles = {this.state.articles} />
        <QueryDataDiv key = 'more' visible = {addMoreVisible} more = {this.loadMore} />
      </div>
    )
  }
}

module.exports = ArticleDiv;