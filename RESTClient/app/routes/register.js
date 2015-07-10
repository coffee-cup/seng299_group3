
export default Ember.Route.extend({
  beforeModel: function() {
    // reset inputs
    var c = this.controllerFor('register');
    c.set('username', '');
    c.set('password', '');
    c.set('name', '');
    c.set('repass', '');
  }
});
