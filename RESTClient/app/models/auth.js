export default DS.Model.extend({
    authToken: DS.attr(),
    accountID: DS.attr(),
    username: DS.attr(),
    name: DS.attr(),
    banned: DS.attr()
});
