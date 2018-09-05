import React from 'react'
import SimpleMDE from 'simplemde-customize-for-blog'
import { connect } from 'react-redux'

import ChoosePhotoDialog from './choose-photo-dialog'
import InsertUrlDialog from './insert-url-dialog'

import {
  articleChange,
  insertUrlVisibleStateChange,
  photoVisibleStateChange,
  photoUploadReturnName,
} from '$actions/article-edit'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.articleChange = this.articleChange.bind(this)
    this.imageDrop = this.imageDrop.bind(this)
    this.insertImage = this.insertImage.bind(this)
    this.insertUrl = this.insertUrl.bind(this)
  }
  componentDidMount () {
    this.editor = new SimpleMDE({
      element: this.textarea,
      indentWithTabs: false,
      status: false,
      spellChecker: false,
      drawImage: this.props.showInsertImageDialog,
      drawLink: this.props.showInsertUrlDialog,
    })
    this.editor.codemirror.on('change', this.articleChange)
    this.editor.codemirror.on('drop', this.imageDrop)
    document.addEventListener('drag', this.dragPreventDefault)
    document.addEventListener('dragover', this.dragPreventDefault)
  }
  componentWillUnmount () {
    this.editor.codemirror.off('change', this.articleChange)
    this.editor.codemirror.off('drop', this.imageDrop)
    document.removeEventListener('drag', this.dragPreventDefault)
    document.removeEventListener('dragover', this.dragPreventDefault)
  }
  /* eslint-disable no-unused-vars */
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.article !== this.props.article) {
      this.editor.codemirror.setValue(this.props.article)
    }
  }
  articleChange () {
    var content = this.editor.codemirror.getValue()
    this.props.change(content)
  }
  imageDrop (instance, e) {
    var dt = e.dataTransfer
    if (!dt) {
      return
    }
    var file = dt.files[0]
    photoUploadReturnName(file).then(fname => {
      this.insertImage(fname)
    })
    e.preventDefault()
    e.stopPropagation()
  }
  insertImage (url) {
    this.props.hideInsertImageDialog()
    this.editor.__drawImage(url)
  }
  insertUrl (url) {
    this.props.hideInsertUrlDialog()
    this.editor.__drawLink(url)
  }
  dragPreventDefault (e) {
    e.preventDefault()
  }
  render () {
    return (
      <div id="edit-body">
        <div id="edit-area">
          <textarea
            id="md-editor"
            ref={ta => {
              this.textarea = ta
            }}
            onChange={this.articleChange}
          />
        </div>
        <ChoosePhotoDialog confirm={this.insertImage} />
        <InsertUrlDialog confirm={this.insertUrl} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  article: state.articleInitial,
})

const mapDispatchToProps = dispatch => ({
  change: article => {
    dispatch(articleChange(article))
  },
  showInsertImageDialog: () => {
    dispatch(photoVisibleStateChange(true))
  },
  showInsertUrlDialog: () => {
    dispatch(insertUrlVisibleStateChange(true))
  },
  hideInsertImageDialog: () => {
    dispatch(photoVisibleStateChange(false))
  },
  hideInsertUrlDialog: () => {
    dispatch(insertUrlVisibleStateChange(false))
  },
})

const _Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

export default _Editor
