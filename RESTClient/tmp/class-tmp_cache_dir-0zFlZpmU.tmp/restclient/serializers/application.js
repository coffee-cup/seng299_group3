define("restclient/serializers/application", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.RESTSerializer.extend({
    	primaryKey: '_id'
    });
  });