export default Ember.Controller.extend({
  needs: ['application'],
  // computed property for getting user
  user: function() {
    return this.get('controllers.application.auth');
  }.property('controllers.application.auth')
});
