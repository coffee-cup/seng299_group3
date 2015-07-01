import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('bookroom');
  this.route('login');
  this.route('register');
  this.route('schedule');
  this.route('mybookings');

  this.route('posts'); // example route
});

export default Router;
