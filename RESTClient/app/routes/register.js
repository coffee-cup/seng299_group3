
export default Ember.Route.extend({
  beforeModel: function() {
    // reset inputs
    var c = this.controllerFor('register');
    c.set('username', '');
    c.set('password', '');
    c.set('name', '');
    c.set('repass', '');
    c.set('error_pass', false);
    c.set('error_username', false);
    c.set('error_name', false);
    c.set('error_message', '');
  },

  model: function(params) {
    // check if there are redirect params in query of url
    if (params.n) {
      var n = params.n;
      var c = this.controllerFor('register');
      if (n == 'bookroom' || n == 'mybookings') {
        c.set('redirect', n);
      } else {
        c.set('redirect', null)
      }

      // if user was trying to book a room
      // capture the params
      if (params.hour) c.set('hour', params.hour);
      if (params.ampm) c.set('ampm', params.ampm);
      if (params.date) c.set('date', params.date);
      if (params.people) c.set('people', params.people);
      if (params.room_id) c.set('room_id', params.room_id);
    }
  },

  actions: {
    didTransition: function(queryParams) {
      this.controllerFor('application').send('setActiveTab', 'Register');
    }
  }
});
