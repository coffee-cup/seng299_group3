export default Ember.Handlebars.makeBoundHelper( function(startTime, endTime, options) {
  var startString = '';
  var endString = '';
  if (startTime > 12) {
    startString = (startTime - 12) + 'pm';
  } else {
    startString = startTime + 'am';
  }

  if (endTime > 12) {
    endString = (endTime - 12) + 'pm';
  } else {
    endString = endTime + 'am';
  }
  return startString + ' to ' + endString;
});
