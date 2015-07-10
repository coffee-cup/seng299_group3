var scope = {
  this: null
};

export default Ember.Controller.extend({
  queryParams: ['hour', 'ampm', 'date', 'people', 'room_id'],

  dateSelected: 1,
  selectedGuests: 0,
  selectedSTime: 3,
  selectedETime: 2,
  selectedRoom: {name: 'Fox Double'},
  selectedIPads: 0,
  selectedMicrophones: 0,

  //BACKEND CALL THIS PART
  numGuests: [0,1,2,3,4,5,6,7,8,9,10,11,12],
  extraMicrophones: [0,1,2,3,4,5,6,7,8,9,10],
  extraIPads: [0,1,2,3,4,5,6,7,8,9,10],
  dates: [1,23,3,5],
  sTimes: [3,4,6,7,1],
  eTimes: [2,5,32,4,76,0],

  rooms: [
    {name: 'Fox Double', people: 2, numIPad: 1, numMicrophone: 1},
    {name: 'Fox Quad', people: 4, numIPad: 2, numMicrophone: 2},
    {name: 'Fox Grande', people: 8, numIPad: 4, numMicrophone: 4},
    {name: 'Fox Enorme', people: 12, numIPad: 6, numMicrophone: 6},
  ],

   totaltime: function(){
     console.log("I was called");
     if(this.get('selectedSTime') >= 11){
       var s = this.get('selectedSTime') - 12;
       return this.get('selectedETime') - s;
     }else
       return this.get('selectedETime') - this.get('selectedSTime');
   }.property('selectedSTime', 'selectedETime'),

  user: function() {
    var user = {
      username: 'username',
      name: 'Name',
      accountID: 'id'
    };
    return user;
  }.property(),

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

  actions: {
    createBooking: function() {
      console.log('test');
      $('#bookingConfirmModal').modal('show');
    }
  }
});
