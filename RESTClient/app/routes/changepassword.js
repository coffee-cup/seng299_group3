
export default Ember.Route.extend({
  beforeModel: function() {
    this.controllerFor('changepassword').set('new_password', '');
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID) {
      this.transitionTo('login');
    }
  }
});
