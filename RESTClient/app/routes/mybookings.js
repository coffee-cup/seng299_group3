export default Ember.Route.extend({
  beforeModel: function() {
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID) {
      this.transitionTo('login', {queryParams: {n: 'mybookings'}});
    }
  },
  model: function() {
    this.controllerFor('mybookings').send('getBookings');
  },
  actions: {
    didTransition: function(queryParams) {
      this.controllerFor('application').send('setActiveTab', 'MyBookings');
    }
  }
});
