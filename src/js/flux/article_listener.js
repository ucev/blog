const Action = require('./actions/actions_article');
const Dispatcher = require('./dispatcher/dispatcher_base');
const Register = require('./dispatcher/dispatcher_articles');
const Store = require('./stores/stores_article');

const Builder = require('./register_builder');

module.exports = function() {
  return new Builder(Action, Dispatcher, Store, Register);
}