import React from 'react'
import { connect } from 'react-redux'

import {
  publishArticle
} from '$actions/article-edit'

const PublishArticleButton = ({ publish }) => (
  <button id="submit" className = 'operation-button' onClick = {publish}>发布文章</button>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  publish: () => {
    dispatch(publishArticle())
  }
})

const _PublishArticleButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishArticleButton)

export default _PublishArticleButton
