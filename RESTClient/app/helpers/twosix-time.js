export default Ember.Handlebars.makeBoundHelper( function(value, options) {
  var time = value;
  var ampm = 'am';
  if (value > 24) {
    time = value - 24;
    ampm = 'am';
  } else if (value == 24) {
    time = 12;
    ampm = 'am';
  } else if (value > 12) {
    time = value - 12;
    ampm = 'pm'
  }

  return time + ampm;
});
