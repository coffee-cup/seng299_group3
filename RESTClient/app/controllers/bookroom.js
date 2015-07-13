var scope = {
  this: null
};

export default Ember.Controller.extend({
  queryParams: ['hour', 'ampm', 'date', 'people', 'room_id'],
  needs: ['application'],

  datePicked: false,
  guestsPicked: false,
  micChange: false,
  iPadChange: false,

  showSelectedRoom: false,
  showStartTime: false,
  showEndTime: false,
  showEquipment: false,
  showLink: false,

  //selectedRoom: {
  //  name: "null",
  //  size:   3
  //},
  selectedGuests: 0,
  selectedSTime: 4,
  selectedETime: 5,
  selectedIPads: 0,
  selectedMicrophones: 0,

  //BACKEND CALL THIS PART
  selectedRoom: ["Choose a Room..."],
  numGuests: [0,1,2,3,4,5,6,7,8,9,10,11,12],
  extraMicrophones: [0,1,2,3,4,5,6,7,8,9,10],
  extraIPads: [0,1,2,3,4,5,6,7,8,9,10],
  dates: [1,2,3,4,5,6,7,8,9,10],
  sTimes: [4,5,6,7,8,9,10,11,12],
  eTimes: [5,6,7,8,9,10,11,12,1],


   totalTime: function(){
     var s = parseInt(this.get('selectedSTime'));
     var e = parseInt(this.get('selectedETime'));
     var t = e - s;
     console.log(typeof(s));
     console.log(e);
     console.log(typeof(e));
     console.log(typeof(t));
     console.log(t);
     if(s > 11){
       t = t+12
       return t;
     }else
       return t;
   }.property('selectedSTime', 'selectedETime'),

   totalMicrophones: function(){
     console.log('tm');
     return this.get('selectedMicrophones') + this.get('selectedRoom.baseMics');
   }.property('selectedRoom', 'selectedMicrophones'),

   totalIPads: function(){
     console.log('ti');
     return this.get('selectedIPads') + this.get('selectedRoom.baseIPad');
   }.property('selectedIPads', 'selectedRoom'),

   priceMicrophones: function(){
     console.log('pm');
     return this.get('selectedMicrophones') * 3;
   }.property('selectedMicrophones'),

   priceIPads: function(){
     console.log('pi');
     return this.get('selectedIPads') * 4;
   }.property('selectedIPads'),

   priceRoom: function(){
     console.log('pr');
     return (this.get('selectedRoom.price') * this.get('totalTime'));
   }.property('selectedRoom', 'totalTime'),

   totalPrice: function(){
     console.log('tp');
     return this.get('priceRoom') + this.get('priceIPads') + this.get('priceMicrophones');
   }.property('priceRoom', 'priceIPads', 'priceMicrophones'),

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

  paramsChanged: function() {
  }.observes('startTime', 'endTime', 'date', 'people', 'room_id'),

  dateSelectionChanged: function(){
    this.set('datePicked', true);
    console.log('date changed');
    if(this.get('guestsPicked')){
      this.set('showSelectedRoom', true);
      console.log(this.get('showSelectedRoom'));
    }
  }.observes('dateSelected'),

  guestSelectionChanged: function(){
    console.log('guests changed');
    this.set('guestsPicked', true);
    if(this.get('datePicked')){
      this.set('showSelectedRoom', true);
    }
  }.observes('selectedGuests'),

  roomSelectionChanged: function(){
    this.set('showStartTime', true);
  }.observes('selectedRoom.id'),

  startTimeChanged: function(){
    this.set('showEndTime', true);
  }.observes('start'),

  endTimeChanged: function(){
    this.set('showEquipment', true);
  }.observes('end'),

  microphonesChanged: function(){
    this.set('micChange', true);
    if(this.get('iPadChange')){
      this.set('showLink', true);
    }
  }.observes('selectedMicrophones'),

  iPadsChanged: function(){
    this.set('iPadChange', true);
    if(this.get('micChange')){
      this.set('showLink', true);
    }
  }.observes('selectedIPads'),

  actions: {
    createBooking: function() {
      console.log('test');
      $('#bookingConfirmModal').modal('show');
    },

  }
});
