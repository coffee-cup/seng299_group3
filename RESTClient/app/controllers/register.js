export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['n', 'hour', 'date', 'people', 'room_id'],

  username: '',
  name: '',
  password: '',
  repass: '',

  error_pass: false,
  error_username: false,
  error_name: false,
  error_message: '',

  domain_path: 'api/users',
  domain: function() {
    return this.get('controllers.application.SERVER_DOMAIN');
  }.property(),

  actions: {
    registerUser: function() {
      var _this = this;

      var name = this.get('name');
      var username = this.get('username');
      var password = this.get('password');
      var repass = this.get('repass');

      // check if there are any errors with input data
      var error = false;
      if (Ember.isEmpty(password) || Ember.isEmpty(repass) || password !== repass) {
        error = true;
        this.set('error_pass', true);
      } else {
        this.set('error_pass', false);
      }

      if (Ember.isEmpty(username)) {
        error = true;
        this.set('error_username', true);
      } else {
        this.set('error_username', false);
      }

      if (Ember.isEmpty(name)) {
        error = true;
        this.set('error_name', true);
      } else {
        this.set('error_name', false);
      }

      var postData = {
        username: username,
        name: name,
        password: password
      }

      if (!error) {
        this.set('error_message', '');
        var url = this.get('domain') + this.get('domain_path');
        // no errors with input, try to register new user with server
        Ember.$.post(url, postData, function( data ) {
          // register did not work
          if (!data.user) {
            _this.set('error_message', data.message);
          } else {
            var user = data.user;
            var auth = {
              id: 1,
              authToken: null,
              accountID: user._id,
              name: user.name,
              username: user.username,
              banned: false,
              bannedUntil: null
            };

            _this.get('controllers.application').send('sendNotification', 'Registered account', 'success');

            _this.store.push('auth', auth);
            _this.set('controllers.application.auth', auth);
            var redirect = _this.get('redirect');
            if (redirect) {
              _this.transitionToRoute(redirect);
            } else {
              _this.transitionToRoute('index');
            }
          }
        }).error(function(err) {
          // could not connect to server
          _this.set('error_message', 'Could not connect to server');
        });
      } else {
        console.log('we have an error');
      }
    },

    redirectLogin: function() {
      var redirect = this.get('redirect');
      if (redirect) {
        var q = {
          // 'hour', 'ampm', 'date', 'people', 'room_id'
          hour: this.get('hour'),
          ampm: this.get('ampm'),
          date: this.get('date'),
          people: this.get('people'),
          room_id: this.get('room_id'),
          n: redirect
        };
        console.log(q);
        this.transitionToRoute('login', {queryParams: q});
      } else {
        this.transitionToRoute('login');
      }
    }
  },
});
