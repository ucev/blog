const Action = require('./actions/actions_category');
const Dispatcher = require('./dispatcher/dispatcher_base');
const Register = require('./dispatcher/dispatcher_category');
const Store = require('./stores/stores_category');

const Builder = require('./register_builder');

module.exports = function() {
  return new Builder(Action, Dispatcher, Store, Register);
}