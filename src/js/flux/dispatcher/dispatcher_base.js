const Dispatcher = require('flux').Dispatcher;

class BaseDispatcher extends Dispatcher {
  constructor(store, regFunc) {
    super();
    this.register(regFunc(store));
  }
}

module.exports = BaseDispatcher;