/* jshint ignore:start */

define('restclient/config/environment', ['ember'], function(Ember) {
  var prefix = 'restclient';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("restclient/tests/test-helper");
} else {
  require("restclient/app")["default"].create({});
}

/* jshint ignore:end */
