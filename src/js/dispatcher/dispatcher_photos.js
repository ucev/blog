const AppDispatcher = require('./dispatcher_app');
const PhotoStore = require('../stores/stores_photos');

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case "FETCH_PHOTO_GROUPS":
      PhotoStore.fetchPhotoGroups();
      break;
    case "PHOTO_GROUP_CHANGE":
      PhotoStore.photoGroupChange(action.gid);
      break;
    case "REFETCH":
      PhotoStore.refetch();
      break;
    default:
      break;
  }
})

module.exports = AppDispatcher;