const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const PhotoFlowOperationBar = require('./photo-flow-operation-bar')

const PhotoFlow = ({ photos, groups }) => {
  const items = photos.map(photo =>
    <PhotoItem key={photo.id} photo={photo} groups={groups} />
  );
  return (
    <div id='photo-flow-div'>
      <PhotoFlowOperationBar />
      <ul id='photo-flow-items-ul'>
        {items}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  photos: state.photos,
  groups: state.groups
})

const mapDispatchToProps = (dispatch) => ({})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoFlow)
