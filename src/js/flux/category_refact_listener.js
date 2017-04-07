const Action = require('./actions/actions_category_refact');
const Dispatcher = require('./dispatcher/dispatcher_base');
const Register = require('./dispatcher/dispatcher_category_refact');
const Store = require('./stores/stores_category_refact');

const Builder = require('./register_builder');

module.exports = function() {
  return new Builder(Action, Dispatcher, Store, Register);
}