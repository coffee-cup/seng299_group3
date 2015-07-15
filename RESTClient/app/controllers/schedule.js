var scope = {
  this: null
};

export default Ember.Controller.extend({
  needs: ['application'],

  // the day for the schedule view
  today: new Date(),
  date: new Date(),

  cannot_book_message: '',
  cannot_book: false,

  // the number of people to make api call for get avaialbe rooms with
  num_people: 2,

  people_options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

  domain_path: 'api/room/getRoomsByCapacity',
  domain: function() {
    return this.get('controllers.application.SERVER_DOMAIN');
  }.property(),

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

    /* $('#sch-calendar').datepicker({});

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
    }); */
},

peopleChanged: function() {
  this.send('updateSchedule');
}.observes('num_people'),

dateChanged: function() {
  this.send('dateChanged');
}.observes('date'),

actions: {

  linkSlot: function(time, booked, room_id) {
    if (!booked) {
      var query = '?hour=' + time + '&room_id=' + 'room_id' + '&date=' + this.get('date') + '&people=' + this.get('num_people');
      console.log('linking to');
      console.log(query);
      var queryParams = {
        'hour': time,
        'room_id': room_id,
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

      var d = this.get('date');
      var people = this.get('num_people');

      // localhost:7000/api/availability?day=13&month=7&year=2015&num_people=1
      var dateString = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
      var url = this.get('domain') + 'api/availability?day=' + d.getDate() + '&month=' + (d.getMonth() + 1) + '&year=' + d.getFullYear() + '&num_people=' + people + '&date=' + dateString;
      var _this = this;
      console.log(url);
      Ember.$.get(url, function( data ) {
        if (data.rooms) {
          var sorted = data.rooms.sort(function(a, b) {
            return a.roomID - b.roomID;
          });
          _this.set('rooms', sorted);
        }
      });

    },

    transition: function() {
      // Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
      $('#sch-calendar').datepicker({startDate: this.get('today')});
    },

    dateChanged: function() {
      var d = this.get('date');

      // if date is older than today
      var today = this.get('today');
      if (d < today) {
        this.set('cannot_book_message', 'Cannot book rooms older than today');
        this.set('cannot_book', true);
        return;
      }

      // if date is past 2 weeks
      var weeks = new Date();
      weeks.setDate(today.getDate() + 14);
      if (d > weeks) {
        this.set('cannot_book_message', 'Cannot book rooms more than 2 weeks in future');
        this.set('cannot_book', true);
        return;
      }

      this.set('cannot_book', false);

      this.send('updateSchedule');
    },

    setDateToday: function() {
      console.log('setting date today');
      // for some reason have to make a new date this way,
      // otherwise it does not select the day in the calendar
      var d = new Date();
      // $('#sch-calendar').datepicker('setDate', new Date(d.getFullYear(), d.getMonth(), d.getDate()));

      this.set('date', d);
    }
  }

});
