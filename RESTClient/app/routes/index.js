var posts = [{
    title: "Rails is omakase",
    body: "There are lots of à la carte software environments in this world."
  }, {
    title: "Broken Promises",
    body: "James Coglan wrote a lengthy article about Promises in node.js."
}];

export default Ember.Route.extend({
  model: function() {
    console.log(posts);
    return posts;
  }
});
