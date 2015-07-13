var scope = {
  this: null
};

export default Ember.Controller.extend({
  queryParams: ['hour', 'date', 'people', 'room_id'],
  needs: ['application'],

  extraMics: 0,
  extraIpads: 0,

 // totalMicrophones: function(){
 //   console.log('tm');
 //   return this.get('selectedMicrophones') + this.get('selectedRoom.baseMics');
 // }.property('selectedRoom', 'selectedMicrophones'),

 // totalIPads: function(){
 //   console.log('ti');
 //   return this.get('selectedIPads') + this.get('selectedRoom.baseIPad');
 // }.property('selectedIPads', 'selectedRoom'),

 // priceMicrophones: function(){
 //   console.log('pm');
 //   return this.get('selectedMicrophones') * 3;
 // }.property('selectedMicrophones'),

 // priceIPads: function(){
 //   console.log('pi');
 //   return this.get('selectedIPads') * 4;
 // }.property('selectedIPads'),

 // priceRoom: function(){
 //   console.log('pr');
 //   return (this.get('selectedRoom.price') * this.get('totalTime'));
 // }.property('selectedRoom', 'totalTime'),

 // totalPrice: function(){
 //   console.log('tp');
 //   return this.get('priceRoom') + this.get('priceIPads') + this.get('priceMicrophones');
 // }.property('priceRoom', 'priceIPads', 'priceMicrophones'),

  // computed property for getting user
  user: function() {
    return this.get('controllers.application.auth');
  }.property('controllers.application.auth'),

  getDates : function(){
    this.get('');
  },
  // map the variables startTime, endTime, date, people, and room_id
  // to the form for booking a room

  init : function(){
    this._super();
    scope.this = this;
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  // function gets run after page has been rendered
  // perform all jquery logic here
  afterRenderEvent : function(){
    // implement this hook in your own subclasses and run your jQuery logic there

  },

  totalPrice: function() {
    var selectedRoom = this.get('selectedRoom');
    return selectedRoom.price;
  },

  endTimeChanged: function() {
    this.send('changeEquipment');
  }.observes('end'),

  // dateSelectionChanged: function(){
  //   this.set('datePicked', true);
  //   console.log('date changed');
  //   if(this.get('guestsPicked')){
  //     this.set('showSelectedRoom', true);
  //     console.log(this.get('showSelectedRoom'));
  //   }
  // }.observes('dateSelected'),

  // guestSelectionChanged: function(){
  //   console.log('guests changed');
  //   this.set('guestsPicked', true);
  //   if(this.get('datePicked')){
  //     this.set('showSelectedRoom', true);
  //   }
  // }.observes('selectedGuests'),

  // roomSelectionChanged: function(){
  //   console.log('room changed');
  //   this.set('showStartTime', true);
  //   console.log(this.get('showStartTime'));
  // }.observes('selectedRoom'),

  // startTimeChanged: function(){
  //   this.set('showEndTime', true);
  // }.observes('start'),

  // endTimeChanged: function(){
  //   this.set('showEquipment', true);
  // }.observes('end'),

  // microphonesChanged: function(){
  //   this.set('micChange', true);
  //   if(this.get('iPadChange')){
  //     this.set('showLink', true);
  //   }
  // }.observes('selectedMicrophones'),

  // iPadsChanged: function(){
  //   this.set('iPadChange', true);
  //   if(this.get('micChange')){
  //     this.set('showLink', true);
  //   }
  // }.observes('selectedIPads'),

  actions: {
    changeEquipment: function() {

      var postData = {
        date: this.get('dateReal'),
        startTime: this.get('startTime'),
        endTime: this.get('end').tf
      }

      var d = this.get('dateReal');
      var dateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
      var query = '?date=' + dateString + '&startTime=' + this.get('startTime') + '&endTime=' + this.get('end').tf + '&type=' + 'm';
      // get extra mics
      var selectedRoom = this.get('selectedRoom');
      var url = this.get('controllers.application.SERVER_DOMAIN') + 'api/bookrooms/' + query;
      console.log(url)
      Ember.$.get(url, function(data) {
        console.log(data);
      });
    },

    createBooking: function() {
      $('#bookingConfirmModal').modal('show');
    },

    createBookingServer: function() {
      var selectedRoom = this.get('selectedRoom');
      var user = this.get('user');
      var url = this.get('controllers.application.SERVER_DOMAIN') + 'api/users/' + user.accountID + '/bookings/';

      var postData = {
        roomId: selectedRoom.roomID,
        date: this.get('dateReal'),
        startTime: this.get('startTime'),
        endTime: this.get('end').tf,
        numberOfPeople: this.get('selectedGuests'),
        ipads: this.get('extraIpads'),
        mics: this.get('extraMics')
      }

      console.log(postData);

      var _this = this;
      Ember.$.post(url, postData, function(data) {
        if (data.success) {
          _this.get('controllers.application').send('sendNotification', 'Successfully created booking', 'success');
        } else {
          _this.get('controllers.application').send('sendNotification', 'Could not create booking, sorry', 'error');
        }
        _this.transitionToRoute('mybookings');
      });
    }
  }
});
