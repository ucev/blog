import React from 'react'
import { connect } from 'react-redux'

import ArticleItemLi from '../article-item-li'
import CategoryItemLi from '../category-item-li'

import './category-item-list.style.scss'

class CategoryItemList extends React.PureComponent {
  getChildren () {
    var depth = this.props.depth ? this.props.depth : 0
    var childs = this.props.childs
    var cstate = this.props.cstate
    if (!childs) return
    const content = childs.map(
      child =>
        child.type === 'dir' ? (
          <CategoryItemLi
            key={`categoroy_${child.id}`}
            id={child.id}
            title={child.title}
            childs={child.childs}
            expanded={cstate[child.id] !== false}
            depth={depth + 1}
          />
        ) : (
          <ArticleItemLi
            key={`article_${child.id}`}
            id={child.id}
            title={child.title}
            article={child}
            cid={this.props.id}
            depth={depth + 1}
          />
        )
    )
    return content
  }

  render () {
    return (
      <ul className="category-tree-category-ul" style={this.props.style}>
        {this.getChildren()}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  cstate: state.cstate,
})

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItemList)
