
export default Ember.Route.extend({
  beforeModel: function() {
    // reset input values
    var c = this.controllerFor('login');
    c.set('username', '');
    c.set('password', '');
    c.set('error_username', false);
    c.set('error_password', false);
    c.set('error_message', '');
  },

  model: function(params) {
    // check if there are redirect params in query of url
    if (params.n) {
      var c = this.controllerFor('login');
      var n = params.n;
      if (n == 'bookroom' || n == 'mybookings') {
        c.set('redirect', n);
      } else {
        c.set('redirect', null);
        console.log('setting to null');
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
      this.controllerFor('application').send('setActiveTab', 'Login');
    }
  }
});
