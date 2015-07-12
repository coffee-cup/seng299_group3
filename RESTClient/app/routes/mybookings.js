export default Ember.Route.extend({
  beforeModel: function() {
    var auth = this.controllerFor('application').get('auth');
    if (!auth || !auth.accountID) {
      this.transitionTo('login', {queryParams: {n: 'mybookings'}});
    }
  },
  model: function(){
   this.controllerFor('mybookings');
  }
});
