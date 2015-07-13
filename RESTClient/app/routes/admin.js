import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID || !auth.isAdmin) {
      this.transitionTo('login');
    }
  },

  model: function() {
    this.controllerFor('admin').send('getRooms');
  },

  actions: {
    didTransition: function(params) {
      this.controllerFor('application').send('setActiveTab', 'Admin');
    }
  }
});
