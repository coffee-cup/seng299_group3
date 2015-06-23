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