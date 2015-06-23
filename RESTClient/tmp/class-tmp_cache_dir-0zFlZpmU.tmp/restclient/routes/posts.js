define("restclient/routes/posts", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
    	model: function() {
    		return this.store.find('post');
    	}
    });
  });