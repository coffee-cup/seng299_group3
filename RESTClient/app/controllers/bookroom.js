var scope = {
  this: null
};

export default Ember.Controller.extend({
  queryParams: ['hour', 'ampm', 'date', 'people', 'room_id'],

  dateSelected: 1,
  selectedGuests: 0,
  selectedSTime: 3,
  selectedETime: 2,
  selectedRoom: "Fox Double",
  selectedIPads: 0,
  selectedMicrophones: 0,

  //BACKEND CALL THIS PART
  numGuests: [0,1,2,3,4,5,6,7,8,9,10,11,12],
  extraMicrophones: [0,1,2,3,4,5,6,7,8,9,10],
  extraIPads: [0,1,2,3,4,5,6,7,8,9,10],
  dates: [1,23,3,5],
  sTimes: [3,4,6,7,1],
  eTimes: [2,5,32,4,76,0],
  room_ids: ["Fox Double", "Fox Quad", "Fox Grande", "Fox Enorme"],

  // totaltime: function(){
  //   if(selectedSTime >= 11){
  //     s = selectedSTime - 12;
  //     return selectedETime - s;
  //   }else
  //     return selectedETime - selectedSTime;
  // },

  user: function() {
    var user = {
      username: 'username',
      name: 'Name',
      accountID: 'id'
    }
    return user;
  }.property(),

  getDates : function(){
    this.get('')
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
  }.observes('startTime', 'endTime', 'date', 'people', 'room_id')
});
