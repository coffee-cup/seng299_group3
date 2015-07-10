export default Ember.Controller.extend({
    SERVER_DOMAIN: 'http://localhost:7000/', // what domain and port the server is located at

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
