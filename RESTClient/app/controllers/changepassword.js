export default Ember.Controller.extend({
  needs: ['application', ],
  password: '',

  // computed property for getting user
  user: function() {
    return this.get('controllers.application.auth');
  }.property('controllers.application.auth'),

  domain_path: 'api/users',
  domain: function() {
    return this.get('controllers.application.SERVER_DOMAIN');
  }.property(),


  actions:{
    changePassword: function(){
      var new_password = this.get('new_password');
      var user = this.get('user');

      var postData = {
        password: new_password
      }
      var url = this.get('domain') + this.get('domain_path') + '/' + user.accountID;
      Ember.$.post(url, postData, function(data) {
        console.log(url);
      });
      this.get('controllers.application').send('sendNotification', 'Changed Password for ' + user.username, 'success');
      this.transitionToRoute('login');

    }
  }
});
