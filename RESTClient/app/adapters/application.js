// example ember REST adapter connecting to localhost:3000/api

import DS from "ember-data";

var ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'api'
});

export default ApplicationAdapter;
