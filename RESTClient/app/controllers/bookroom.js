var scope = {
  this: null
};

export default Ember.Controller.extend({
  queryParams: ['hour', 'ampm', 'date', 'people', 'room_id'],

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
