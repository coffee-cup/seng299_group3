export default Ember.Controller.extend({
  needs: ['application'],
  // computed property for getting user
  user: function() {
    return this.get('controllers.application.auth');
  }.property('controllers.application.auth'),

  actions: {
    getBookings: function() {
     var _this = this;
     var auth = this.get('controllers.application.auth');
     var url = this.get('controllers.application.SERVER_DOMAIN') + 'api/users/' + auth.accountID + '/bookings';
     Ember.$.get(url, function(data) {
      if (!data.past_bookings || !data.current_bookings) {
        console.log('error getting user bookings from server');
        return;
      }

      _this.set('past_bookings', data.past_bookings);
      _this.set('current_bookings', data.current_bookings);
    });

   }
 }
});
