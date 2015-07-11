export default Ember.Controller.extend({
    SERVER_DOMAIN: 'http://localhost:7000/', // what domain and port the server is located at

    // computed property for getting user
    user: function() {
      return this.get('auth');
    }.property('auth'),

    // so we can use null in the template
    na: null,

    // if the auth object changes, then reset values in cookies
    authChanged: function() {
      var auth = this.get('auth');

      if (auth.accountID && auth.username && auth.name) {
        console.log('storing auth in cookies');
        Ember.$.cookie('auth_accountID', auth.accountID);
        Ember.$.cookie('auth_username', auth.username);
        Ember.$.cookie('auth_name', auth.name);
      }
    }.observes('auth'),

    init : function(){
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },

  // function gets run after page has been rendered
  // perform all jquery logic here
  afterRenderEvent : function(){
    // implement this hook in your own subclasses and run your jQuery logic there

    // position footer right when html is rendered
    // var containerHeight = $('body').height();
    // var footerHeight = $('footer').height();
    // $('#wrapper').height(containerHeight - footerHeight + 20);
  },
});
