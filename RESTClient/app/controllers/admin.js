export default Ember.Controller.extend({
  needs: ['application'],

  actions: {
    getRooms: function() {
      var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/rooms';
      var _this = this;

    // get rooms that are NOT down
    Ember.$.get(url + '?isDown=false', function(data) {

      if (data.rooms) {

        var rooms = [];
        data.rooms.forEach(function(obj) {
          obj.displayName = obj.roomID + ' - ' + obj.name;
          rooms.push(obj);
        });

        _this.set('selected_room', rooms[0]);
        _this.set('rooms', rooms);
      }
    });

    // get rooms that are down
    Ember.$.get(url + '?isDown=true', function(data) {
      if (data.rooms) {
        _this.set('down_rooms', data.rooms);
      }
    });
  },

  disableRoom: function() {
    var selectedRoom = this.get('selected_room');
    console.log(selectedRoom);
    var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/rooms/' + selectedRoom._id;
    var _this = this;

    var postData = {
      isDown: true
    }

    Ember.$.post(url, postData, function(data) {
      if (data.room) {
        var r = data.room;
        _this.get('controllers.application').send('sendNotification', 'Disabled booking for ' + r.roomID + ' - ' + r.name, 'success');
        _this.send('getRooms');
      } else {
        _this.get('controllers.application').send('sendNotification', data.message, 'error');
      }
    });
  },

  enableRoom: function(room_id) {
    var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/rooms/' + room_id;
    var _this = this;

    var postData = {
      isDown: false
    }
    Ember.$.post(url, postData, function(data) {
      if (data.room) {
        var r = data.room;
        _this.get('controllers.application').send('sendNotification', 'Enabled booking for ' + r.roomID + ' - ' + r.name, 'success');
        _this.send('getRooms');
      } else {
        _this.get('controllers.application').send('sendNotification', data.message, 'error');
      }
    });
  }
}
});
