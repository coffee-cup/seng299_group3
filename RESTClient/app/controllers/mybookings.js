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

      var current_bookings = [];
      var past_bookings = [];

      data.past_bookings.forEach(function(obj) {
        var num_mics = 0;
        var num_ipads = 0;
        obj.equipment.forEach(function(obj) {
          if (obj.type == 'mic') {
            num_mics += 1;
          } else if (obj.type == 'ipad') {
            num_ipads += 1;
          }
        });

        obj.mics = num_mics;
        obj.ipads = num_ipads;
        obj.date = new Date(obj.date);
        obj.room = obj.room[0];
        past_bookings.push(obj);
      });

      data.current_bookings.forEach(function(obj) {
        var num_mics = 0;
        var num_ipads = 0;
        obj.equipment.forEach(function(obj) {
          if (obj.type == 'mic') {
            num_mics += 1;
          } else if (obj.type == 'ipad') {
            num_ipads += 1;
          }
        });

        obj.mics = num_mics;
        obj.ipads = num_ipads;
        obj.date = new Date(obj.date);
        obj.room = obj.room[0];
        current_bookings.push(obj);
      });

      console.log(past_bookings);

      _this.set('past_bookings', past_bookings);
      _this.set('current_bookings', current_bookings);
    });
   },

    cancelBooking: function(booking_id) {
      var user = this.get('user');
      var url = this.get('controllers.application.SERVER_DOMAIN') + 'api/bookings/' +  booking_id;
      var _this = this;
      Ember.$.ajax({
        url: url,
        type: 'DELETE',
        success: function(data) {
          if (data.success) {
            _this.get('controllers.application').send('sendNotification', 'Successfully cancelled booking', 'success');
          } else {
            _this.get('controllers.application').send('sendNotification', 'Could not cancel booking', 'error');
          }
          _this.send('getBookings');
        }
      });
    }
  }
});
