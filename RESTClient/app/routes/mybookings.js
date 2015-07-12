export default Ember.Route.extend({
  beforeModel: function() {
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID) {
      this.transitionTo('login', {queryParams: {n: 'mybookings'}});
    }
  },
  model: function(){
    var _this = this;

    var c = this.controllerFor('application');
    var auth = c.get('auth');
    if (auth && auth.accountID) {
      var url = c.get('SERVER_DOMAIN') + 'api/users/' + auth.accountID + '/bookings';
      Ember.$.get(url, function(data) {
        if (!data.past_bookings || !data.current_bookings) {
          console.log('error getting user bookings from server');
          return;
        }

        c.set('past_bookings', data.past_bookings);
        c.set('current_bookings', data.current_bookings);
      });
    }
  }
});
