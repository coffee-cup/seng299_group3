import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function(params) {
      this.controllerFor('application').send('setActiveTab', 'About');
    }
  }
});
