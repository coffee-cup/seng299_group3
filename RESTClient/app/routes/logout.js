export default Ember.Route.extend({
  // gets called when app first loads
  // create auth object to store for session
  // check if authToken and accountId is in cookies first
  beforeModel: function() {

    // remove cookies
    Ember.$.removeCookie('auth_accountID');
    Ember.$.removeCookie('auth_username');
    Ember.$.removeCookie('auth_name');

    // set auth to nothing
    var auth = {
          id: 1,
          authToken: null,
          accountID: null
        }
    this.store.push('auth', auth);
    this.controllerFor('application').set('auth', auth)
    this.transitionTo('index');
  }
});
