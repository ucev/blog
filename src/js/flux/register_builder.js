class RegisterBuilder {
  /**
   * 
   * Avoid creating Actions, Dispatchers, Stores that doesn't need at one certain page
   * This is what I can do best at current time.
   * 
   * @param {*} Action 
   * @param {*} Dispatcher 
   * @param {*} Store 
   * @param {*} Register 
   */
  constructor(Action, Dispatcher, Store, Register) {
    this.store = new Store();
    this.dispatcher = new Dispatcher(this.store, Register);
    this.action = new Action(this.dispatcher);
  }
  getAction() {
    return this.action;
  }
  getDispatcher() {
    return this.dispatcher;
  }
  getStore() {
    return this.store;
  }
}

module.exports = RegisterBuilder;