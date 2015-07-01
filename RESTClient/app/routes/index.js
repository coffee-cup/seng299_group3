export default Ember.Route.extend({
  beforeModel: function() {
    // redirect main page to schedule view
    this.transitionTo('schedule');
  }
});
