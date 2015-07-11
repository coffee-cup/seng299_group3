
export default Ember.Route.extend({
  beforeModel: function() {
    // reset input values
    this.controllerFor('login').set('username', '');
    this.controllerFor('login').set('password', '');
  },

  model: function(params) {
    // check if there are redirect params in query of url
    if (params.n) {
      var n = params.n;
      if (n == 'bookroom' || n == 'mybookings') {
        this.controllerFor('login').set('redirect', n);
      }
    }
  }
});
