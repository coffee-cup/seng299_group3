
export default Ember.Route.extend({
  beforeModel: function() {
    // reset input values
    this.controllerFor('login').set('username', '');
    this.controllerFor('login').set('password', '');
  }
});
