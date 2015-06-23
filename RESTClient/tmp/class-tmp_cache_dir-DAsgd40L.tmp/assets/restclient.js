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
define("restclient/app", 
  ["ember","ember/resolver","ember/load-initializers","restclient/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Resolver = __dependency2__["default"];
    var loadInitializers = __dependency3__["default"];
    var config = __dependency4__["default"];

    Ember.MODEL_FACTORY_INJECTIONS = true;

    var App = Ember.Application.extend({
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix,
      Resolver: Resolver
    });

    loadInitializers(App, config.modulePrefix);

    __exports__["default"] = App;
  });
define("restclient/initializers/export-application-global", 
  ["ember","restclient/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    function initialize(container, application) {
      var classifiedName = Ember.String.classify(config.modulePrefix);

      if (config.exportApplicationGlobal) {
        window[classifiedName] = application;
      }
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: 'export-application-global',

      initialize: initialize
    };
  });
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
define("restclient/router", 
  ["ember","restclient/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    var Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function() {
      this.resource("posts", function() {});
    });

    __exports__["default"] = Router;
  });
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
define("restclient/serializers/application", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.RESTSerializer.extend({
    	primaryKey: '_id'
    });
  });
define("restclient/templates/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1;


      data.buffer.push("<h2 id=\"title\">Welcome to Ember.js</h2>\n\n");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("restclient/templates/posts", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n<p>Title: ");
      stack1 = helpers._triageMustache.call(depth0, "post.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</p>\n<p>Creator: ");
      stack1 = helpers._triageMustache.call(depth0, "post.creator", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</p>\n<p>Date: ");
      stack1 = helpers._triageMustache.call(depth0, "post.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</p>\n<p>Content: ");
      stack1 = helpers._triageMustache.call(depth0, "post.content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</p>\n");
      return buffer;
      }

      stack1 = helpers.each.call(depth0, "post", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("restclient/tests/adapters/application.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - adapters');
    test('adapters/application.js should pass jshint', function() { 
      ok(true, 'adapters/application.js should pass jshint.'); 
    });
  });
define("restclient/tests/app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('app.js should pass jshint', function() { 
      ok(true, 'app.js should pass jshint.'); 
    });
  });
define("restclient/tests/helpers/resolver", 
  ["ember/resolver","restclient/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var config = __dependency2__["default"];

    var resolver = Resolver.create();

    resolver.namespace = {
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix
    };

    __exports__["default"] = resolver;
  });
define("restclient/tests/helpers/start-app", 
  ["ember","restclient/app","restclient/router","restclient/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Application = __dependency2__["default"];
    var Router = __dependency3__["default"];
    var config = __dependency4__["default"];

    __exports__["default"] = function startApp(attrs) {
      var application;

      var attributes = Ember.merge({}, config.APP);
      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

      Ember.run(function() {
        application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
      });

      return application;
    }
  });
define("restclient/tests/models/post.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - models');
    test('models/post.js should pass jshint', function() { 
      ok(true, 'models/post.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/helpers/resolver.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests/helpers');
    test('restclient/tests/helpers/resolver.js should pass jshint', function() { 
      ok(true, 'restclient/tests/helpers/resolver.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/helpers/start-app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests/helpers');
    test('restclient/tests/helpers/start-app.js should pass jshint', function() { 
      ok(true, 'restclient/tests/helpers/start-app.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/test-helper.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests');
    test('restclient/tests/test-helper.js should pass jshint', function() { 
      ok(true, 'restclient/tests/test-helper.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/unit/adapters/application-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests/unit/adapters');
    test('restclient/tests/unit/adapters/application-test.js should pass jshint', function() { 
      ok(true, 'restclient/tests/unit/adapters/application-test.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/unit/models/post-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests/unit/models');
    test('restclient/tests/unit/models/post-test.js should pass jshint', function() { 
      ok(true, 'restclient/tests/unit/models/post-test.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/unit/routes/posts-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests/unit/routes');
    test('restclient/tests/unit/routes/posts-test.js should pass jshint', function() { 
      ok(true, 'restclient/tests/unit/routes/posts-test.js should pass jshint.'); 
    });
  });
define("restclient/tests/restclient/tests/unit/serializers/application-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - restclient/tests/unit/serializers');
    test('restclient/tests/unit/serializers/application-test.js should pass jshint', function() { 
      ok(true, 'restclient/tests/unit/serializers/application-test.js should pass jshint.'); 
    });
  });
define("restclient/tests/router.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('router.js should pass jshint', function() { 
      ok(true, 'router.js should pass jshint.'); 
    });
  });
define("restclient/tests/routes/posts.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/posts.js should pass jshint', function() { 
      ok(true, 'routes/posts.js should pass jshint.'); 
    });
  });
define("restclient/tests/serializers/application.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - serializers');
    test('serializers/application.js should pass jshint', function() { 
      ok(true, 'serializers/application.js should pass jshint.'); 
    });
  });
define("restclient/tests/test-helper", 
  ["restclient/tests/helpers/resolver","ember-qunit"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var resolver = __dependency1__["default"];
    var setResolver = __dependency2__.setResolver;

    setResolver(resolver);

    document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

    QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
    var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
    document.getElementById('ember-testing-container').style.visibility = containerVisibility;
  });
define("restclient/tests/unit/adapters/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('adapter:application', 'ApplicationAdapter', {
      // Specify the other units that are required for this test.
      // needs: ['serializer:foo']
    });

    // Replace this with your real tests.
    test('it exists', function() {
      var adapter = this.subject();
      ok(adapter);
    });
  });
define("restclient/tests/unit/models/post-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleForModel = __dependency1__.moduleForModel;
    var test = __dependency1__.test;

    moduleForModel('post', 'Post', {
      // Specify the other units that are required for this test.
      needs: []
    });

    test('it exists', function() {
      var model = this.subject();
      // var store = this.store();
      ok(!!model);
    });
  });
define("restclient/tests/unit/routes/posts-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('route:posts', 'PostsRoute', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    test('it exists', function() {
      var route = this.subject();
      ok(route);
    });
  });
define("restclient/tests/unit/serializers/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('serializer:application', 'ApplicationSerializer', {
      // Specify the other units that are required for this test.
      // needs: ['serializer:foo']
    });

    // Replace this with your real tests.
    test('it exists', function() {
      var serializer = this.subject();
      ok(serializer);
    });
  });
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
//# sourceMappingURL=restclient.map