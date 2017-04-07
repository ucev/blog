const EventEmitter = require('events').EventEmitter;

class BaseStore extends EventEmitter {
  constructor() {
    super();
    this.state = {};
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
  getState(key) {
    if (typeof key === 'string')
      return this.state[key];
    else 
      return this.state;
  }
  setState(states, update = true) {
    for (var k in states) {
      this.state[k] = states[k];
    }
    if (update) {
      this.emitChange();
    }
  }
}

module.exports = BaseStore;