const Action = require('./actions/actions_labels');
const Dispatcher = require('./dispatcher/dispatcher_base');
const Register = require('./dispatcher/dispatcher_labels');
const Store = require('./stores/stores_labels');

const Builder = require('./register_builder');

module.exports = function() {
  return new Builder(Action, Dispatcher, Store, Register);
}