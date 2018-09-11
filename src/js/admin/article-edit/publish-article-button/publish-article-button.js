import React from 'react'
import { connect } from 'react-redux'
import OperationButton from '$components/buttons/operation-button'

import { publishArticle } from '$actions/article-edit'

const publishArticleButtonStyle = {
  marginLeft: '100px',
}

const PublishArticleButton = ({ publish }) => (
  <OperationButton
    id="submit"
    title="发布文章"
    onClick={publish}
    style={publishArticleButtonStyle}
  />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  publish: () => {
    dispatch(publishArticle())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishArticleButton)
