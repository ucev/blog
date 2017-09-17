const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const PhotoFlow = require('./photo-flow')
const PhotoGroupBar = require('./photo-group-bar')
import {
  fetchGroupPhotos,
  fetchPhotoGroups
} from '../../redux/actions/photos'

class PhotoArea extends React.Component {
  componentDidMount() {
    this.props.fetchPhotoGroups();
    this.props.fetchGroupPhotos();
  }
  render() {
    return (
      <div id='photo-div'>
        <PhotoFlow />
        <PhotoGroupBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  fetchGroupPhotos: () => {
    dispatch(fetchGroupPhotos())
  },
  fetchPhotoGroups: () => {
    dispatch(fetchPhotoGroups())
  }
})

module.exports = connect(
  fetchGroupPhotos,
  fetchPhotoGroups
)(PhotoArea)
