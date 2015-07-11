
export default Ember.Route.extend({

  beforeModel: function() {
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID) {
     this.transitionTo('login', {queryParams: {n: 'bookroom'}});
    }
  },

  model: function(params) {
    var c = this.controllerFor('bookroom');

    // params.date, .hour, .ampm, .room_id, .people
    // to make request to server to check if that time is available
    // since the user can book for multiple hours, the startTime value is params.date
    // the endTime will default be params.date + 1
    // the request should use only the information

    // parse the date depending on ampm etc
    if (params.hour && (params.ampm=='am' || params.ampm=='pm') && parseInt(params.hour)) {
      var h = parseInt(params.hour);

      // convert to 24-hour time - easier to work with
      if (params.ampm == 'pm') {
        h = h + 12;
      }
      c.set('selectedSTime', h);

      var endTime = h + 1;
      if (endTime >= 24) {
        endTime = endTime - 24;
      }
      c.set('selectedETime', endTime);
    } else {
      c.set('selectedETime', '');
      console.log('test');
      c.set('selectedSTime', null);
    }

    if (params.date) {c.set('date', new Date(params.date));}
    else {c.set('date', null);}

    if (params.people) {c.set('people', params.people);}
    if (params.room_id) {c.set('room_id', params.room_id);}
  },

  actions: {
    didTransition: function(queryParams) {
      // called everytime page is tranistioned to
    }
  }
});
