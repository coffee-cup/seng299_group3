import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.controllerFor('admin').send('getRooms');
  },

  actions: {
    didTransition: function(params) {
      this.controllerFor('application').send('setActiveTab', 'Admin');
    }
  }
});
