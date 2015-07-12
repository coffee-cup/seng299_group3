// example of ember model

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  roomID: DS.attr(),
  size: DS.attr(),
  price: DS.attr(),
  baseIPads: DS.attr(),
  baseMics: DS.attr()
});
