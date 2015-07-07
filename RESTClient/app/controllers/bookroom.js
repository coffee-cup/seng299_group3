var scope = {
  this: null
};

export default Ember.Controller.extend({
  queryParams: ['hour', 'ampm', 'date', 'people', 'room_id'],

  dateSelected: 1,
  selectedSTime: 3,
  selectedETime: 2,
  selectedRoom: "Room 1",
  dates: [1,23,3,5],
  sTimes: [3,4,6,7,1],
  eTimes: [2,5,32,4,76,0],
  room_ids: ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"],

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
