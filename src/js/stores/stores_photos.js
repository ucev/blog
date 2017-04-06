const BaseStore = require('./stores_base');

class PhotoStore extends BaseStore {
  constructor() {
    super();
    this.gid = -1;
    this.key = new Date().getTime();
    // groups
    this.groups = [];
  }
  fetchPhotoGroups() {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/get',
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.groups = dt.data;
          that.emitChange();
        }
      }
    });
  }
  photoGroupChange(gid) {
    this.gid = gid;
    this.key = new Date().getTime();
    this.emitChange();
  }
  refetch() {
    this.key = new Date().getTime();
    this.emitChange();
  }
  getAll() {
    return {
      gid: this.gid,
      key: this.key,
      groups: this.groups
    }
  }
};

module.exports = new PhotoStore();