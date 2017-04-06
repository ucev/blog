const PhotoDispatcher = require('../dispatcher/dispatcher_photos');

const PhotoActions = {
  fetchPhotoGroups: function() {
    PhotoDispatcher.dispatch({
      actionType: "FETCH_PHOTO_GROUPS"
    })
  },
  photoGroupChange: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_GROUP_CHANGE",
      gid: gid
    })
  },
  refetch: function() {
    PhotoDispatcher.dispatch({
      actionType: "REFETCH"
    })
  },
};

module.exports = PhotoActions;