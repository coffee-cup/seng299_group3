var scope = {
  this: null
};

export default Ember.Controller.extend({

  // the day for the schedule view
  date: null,

  // the number of people to make api call for get avaialbe rooms with
  num_people: null,


  // called when the controller loads for first time
  // not when page is naviagted to
  init : function(){
    this._super();
    scope.this = this;
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  // function gets run after page has been rendered
  // perform all jquery logic here
  afterRenderEvent : function(){
    // implement this hook in your own subclasses and run your jQuery logic there
    $('#sch-calendar').datepicker({});

    $('#sch-calendar').datepicker()
      .on('changeDate', function(e) {
        $("#my_hidden_input").val(
            $("#sch-calendar").datepicker('getFormattedDate')
         );
         scope.this.send('dateChanged');
      });

    this.set('num_people', $('#sch-num-people').val());

    // set date selected to today
    this.send('setDateToday');

    // set event listener on number of people select dropdown
    $('#sch-num-people').change(function() {
      scope.this.set('num_people', $('#sch-num-people').val());
      scope.this.send('updateSchedule');
    });
  },

  actions: {

    linkSlot: function(hour, ampm, booked, room_id) {
      if (!booked) {
        var query = '?hour=' + hour + '&ampm=' + ampm + '&room_id=' + 'room_id' + '&date=' + this.get('date') + '&people=' + this.get('num_people');
        var queryParams = {
          'hour': hour,
          'ampm': ampm,
          'room_id': 'room_id',
          'date': this.get('date'),
          'people': this.get('num_people')
        };
        this.transitionToRoute('bookroom', {queryParams: queryParams});
      }
    },

    updateSchedule: function() {
      // Call server here to refresh the model with a call to getAvailableRooms(date, num_people)
      console.log('\nUPDATE SCHEDULE VIEW');
      console.log('PEOPLE: ' + this.get('num_people'));
      console.log('DATE: ' + this.get('date'));
    },

    transition: function() {
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },

    dateChanged: function() {
      var d = new Date($('#my_hidden_input').val());
      this.set('date', d);
      this.send('updateSchedule');
    },

    setDateToday: function() {
      // for some reason have to make a new date this way,
      // otherwise it does not select the day in the calendar
      var d = new Date();
      $('#sch-calendar').datepicker('setDate', new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    }
  }

});
