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
      console.log('change me');

      // get extra mics
      var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/bookroom/';
    },

    createBooking: function() {
      $('#bookingConfirmModal').modal('show');
    },

    createBookingServer: function() {
      var url = this.controllerFor('application').get('SERVER_DOMAIN') + 'api/rooms/' + selectedRoom._id;

      var postData = {
        roomID: this.get('selectedRoom').roomID,
        date: this.get('dateSelected'),
        startTime: this.get('startTime'),
        endTime: ghis.get('endTime'),
        numberOfPeople: this.get('selectedGuests'),
        ipads: this.get('extraIpads'),
        mics: this.get('extraMics')
      }
    }
  }
});
