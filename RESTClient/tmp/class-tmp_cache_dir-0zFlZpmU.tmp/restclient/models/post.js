define("restclient/models/post", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.Model.extend({
      name: DS.attr('String'),
      date: DS.attr('Date'),
      creator: DS.attr('String'),
      content: DS.attr('String')
    });
  });