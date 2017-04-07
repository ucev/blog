const Action = require('./actions/actions_photos');
const Dispatcher = require('./dispatcher/dispatcher_base');
const Register = require('./dispatcher/dispatcher_photos');
const Store = require('./stores/stores_photos');

const Builder = require('./register_builder');

module.exports = function() {
  return new Builder(Action, Dispatcher, Store, Register);
}