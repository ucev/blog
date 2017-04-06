const EventEmitter = require('events').EventEmitter;

class BaseStore extends EventEmitter {
  constructor() {
    super();
  }
  emitChange() {
    this.emit("change");
  }
  addChangeListener(cb) {
    this.on("change", cb);
  }
  removeChangeListener(cb) {
    this.removeListener("change", cb);
  }
}

module.exports = BaseStore;