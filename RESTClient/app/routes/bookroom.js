
export default Ember.Route.extend({

  beforeModel: function() {
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID) {
      this.transitionTo('login');
    }
  },

  model: function(params) {
    var auth = this.controllerFor('application').get('auth');
    // if there is no user logged in
    if (!auth || !auth.accountID) {
     this.transitionTo('login', {queryParams: {
      n: 'bookroom',
      hour: params.hour,
      ampm: params.ampm,
      date: params.date,
      people: params.people,
      room_id: params.room_id
    }});
     return;
   }

   var c = this.controllerFor('bookroom');

    // params.date, .hour, .ampm, .room_id, .people
    // to make request to server to check if that time is available
    // since the user can book for multiple hours, the startTime value is params.date
    // the endTime will default be params.date + 1
    // the request should use only the information

    // parse the date depending on ampm etc
    if (params.hour && (params.ampm=='am' || params.ampm=='pm') && parseInt(params.hour)) {
      var h = parseInt(params.hour);
      var hours = [];
      hours.push(h);
      hours.push(h+1);
      hours.push(h+2);
      console.log(hours);
      c.set('hours', hours);
      var eHours = hours.slice(1,hours.length);
      console.log(eHours);
      c.set('eHours', eHours);
      // convert to 24-hour time - easier to work with
      if (params.ampm == 'pm') {
        h = h + 12;
      }


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

    var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/rooms';
    var _this = this;

    console.log('URL-->   ' + url);
    Ember.$.get(url, function(data) {
      console.log('I better be in here');
      if (data.rooms) {
        var allRooms = [];
        allRooms.push('Choose A Room...');
        data.rooms.forEach(function(obj, i) {
          obj.displayName = obj.roomID + ' - ' + obj.name;
          allRooms.push(obj);
        });
        console.log('the line below this is important');
        console.log(data.rooms);
        _this.controllerFor('bookroom').set('rooms', allRooms);
        _this.controllerFor('bookroom').set('selectedRoom', allRooms[0]);
        _this.controllerFor('bookroom').set('showStartTime', false);
      }
    });
  },

  actions: {
    didTransition: function(queryParams) {
      this.controllerFor('application').send('setActiveTab', 'MakeBooking');
    }
  }
});
