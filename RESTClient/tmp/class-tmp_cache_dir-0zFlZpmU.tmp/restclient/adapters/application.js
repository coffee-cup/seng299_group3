define("restclient/adapters/application", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    var ApplicationAdapter = DS.RESTAdapter.extend({
        host: 'http://localhost:3000',
        namespace: 'api'
    });

    __exports__["default"] = ApplicationAdapter;
  });