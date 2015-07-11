export default Ember.Controller.extend({
    SERVER_DOMAIN: 'http://134.87.151.213:7100', // what domain and port the server is located at

    // computed property for getting user
    user: function() {
      return this.get('auth');
    }.property('auth'),

    // if the auth object changes, then reset values in cookies
    authChanged: function() {
      var auth = this.get('auth');

      if (auth.accountID && auth.username && auth.name) {
        console.log('storing auth in cookies');
        Ember.$.cookie('auth_accountID', auth.accountID);
        Ember.$.cookie('auth_username', auth.username);
        Ember.$.cookie('auth_name', auth.name);
      }
    }.observes('auth')
  });
