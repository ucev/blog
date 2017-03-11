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
    return (
      <li className = {classes} onClick = {this.handleClick}>{this.props.title}</li>
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
    if (page != 0) lis.push(<TableNavLinkLi page = {page - 1} current = {page} title='上一页' click = {this.handleClick} />);
    for (let i = 1; i <= len; i++)
      lis.push(<TableNavLinkLi page = {start + i - 1} current = {page} title= {start + i} click = {this.handleClick} />);
    if (page + 1 < total) lis.push(<TableNavLinkLi page = {page + 1} current = {page} title = '下一页' click = {this.handleClick} />);
    return lis;
  }
  render() {
    const lis = this.getRenderData();
    return (
      <ul id = 'table-nav-ul'>
        {lis}
      </ul>
    );
  }
}

module.exports = TableNavLink;