
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
      date: params.date,
      people: params.people,
      room_id: params.room_id
    }});
     return;
   }

   var c = this.controllerFor('bookroom');

   var d = new Date(params.date);
   if (!(d && params.hour && params.room_id && params.people) || d == "Invalid Date") {
    this.transitionTo('index');
    return;
  }

  if (params.date) {
    c.set('dateSelected', moment(d).format('dddd MMMM Do'));
    c.set('dateReal', d);
  } else {
    values_from_query = false;
  }

  c.set('numGuests', [1,2,3,4,5,6,7,8,9,10,11,12]);
  if (params.people) {
    c.set('selectedGuests', parseInt(params.people));
  } else {
    values_from_query = false;
  }

  if (params.room_id) {
    c.set('room_id', params.room_id);
  } else {
    c.set('room_id', 1);
    values_from_query = false;
  }

  if (params.hour) {
    var t = parseInt(params.hour);
    var value = t;
    var ampm = 'am';
    if (value > 24) {
      t = value - 24;
      ampm = 'am';
    } else if (value == 24) {
      t = 12;
      ampm = 'am';
    } else if (value > 12) {
      t = value - 12;
      ampm = 'pm'
    }

    c.set('startTime', value);
    c.set('startTimeString', t + ampm)
  }

  var dateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
  var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/availability?day=' + d.getDate() + '&month=' + (d.getMonth() + 1) + '&year=' + d.getFullYear() + '&num_people=' + params.people + '&date=' + dateString;
  var _this = this;
  console.log(url);
  Ember.$.get(url, function( data ) {
    var allRooms = [];
    var selectedRoom;
    if (!data.rooms) {
      console.log('ERROR');
      return;
    }

    console.log(data);

    data.rooms.forEach(function(obj, i) {
      obj.displayName = obj.roomID + ' - ' + obj.name;
      allRooms.push(obj);

      if (obj.roomID == parseInt(params.room_id)) {
        selectedRoom = obj;
      }
    });

    var bc = _this.controllerFor('bookroom');
    bc.set('selectedRoom', selectedRoom);
    bc.set('roomDisplayName', selectedRoom.displayName);

    console.log('SELECTED ROOM');
    console.log(selectedRoom);

    var eTimes = [];
    var sTime = parseInt(params.hour);
    var stopped = false;
    selectedRoom.times.forEach(function(time) {
      if (time.time >= sTime) {
        if (!time.booked && !stopped) {

          var t = time.time + 1;
          var value = time.time + 1;
          var ampm = 'am';
          if (value > 24) {
            t = value - 24;
            ampm = 'am';
          } else if (value == 24) {
            t = 12;
            ampm = 'am';
          } else if (value > 12) {
            t = value - 12;
            ampm = 'pm'
          }
          eTimes.push({tf: time.time + 1, ts: t + ampm});
        } else {
          stopped = true;
          return false;
        }
      }
    });
    bc.set('eTimes', eTimes);
    bc.set('end', eTimes[0]);
    bc.send('changeEquipment');
  });

},

actions: {
  didTransition: function(queryParams) {
    this.controllerFor('application').send('setActiveTab', 'MakeBooking');
  }
}
});
