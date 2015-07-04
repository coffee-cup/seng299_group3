var scope = {
  this: null
};

export default Ember.Controller.extend({

  init : function(){
    this._super();
    scope.this = this;
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

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

    this.send('setDateToday');
  },

  actions: {
    dateChanged: function() {
      var d = new Date($('#my_hidden_input').val());
      console.log(d);
      // Call server here to refresh the model with a call to getAvailableRooms(d)
    },

    setDateToday: function() {
      // for some reason have to make a new date this way,
      // otherwise it does not select the day in the calendar
      var d = new Date();
      $('#sch-calendar').datepicker('setDate', new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    }
  }

});
