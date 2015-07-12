export default Ember.Route.extend({
  // gets called when app first loads
  // create auth object to store for session
  // check if authToken and accountId is in cookies first
  beforeModel: function() {

    // check if user is in cookies
    var accountID = $.cookie('auth_accountID');
    var username = $.cookie('auth_username');
    var name = $.cookie('auth_name');
    var isAdmin = $.cookie('isAdmin');
    var banned = $.cookie('banned');

    var auth = {
      id: 1,
      accountID: null,
      authToken: null,
      username: null,
      name: null
    }

    // if user found in the cookies
    // set auth to user info
    if (accountID && username && name) {
      // found user in cookies
      auth.accountID = accountID;
      auth.username = username;
      auth.name = name;
      auth.banned = banned || false;
      auth.isAdmin = isAdmin || false;
    }

    this.store.push('auth', auth);
    this.controllerFor('application').set('auth', auth)
  }
});
