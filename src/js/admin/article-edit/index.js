import React from 'react'
import { connect } from 'react-redux'

import 'simplemde-customize-for-blog/src/css/simplemde.css'
import '$css/article_edit.scss'

import Editor from './editor'
import OperationDiv from './operation-div'

import {
  init
} from '$actions/article-edit'

class ArticleEdit extends React.Component {
  componentDidMount() {
    this.props.init(this.props.type, this.props.id)
  }
  render() {
    return (
      <div>
        <Editor />
        <OperationDiv />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  init: (type, id) => {
    dispatch(init(type, id))
  }
})

const _ArticleEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleEdit)

export default _ArticleEdit
