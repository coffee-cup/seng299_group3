export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['n', 'hour', 'date', 'people', 'room_id'],

  error_username: false,
  error_password: false,
  error_message: '',

  domain_path: 'api/login',
  domain: function() {
    return this.get('controllers.application.SERVER_DOMAIN');
  }.property(),

  actions: {
    createSession: function() {
      var _this = this;

      var username = this.get('username');
      var password = this.get('password');

      var error = false;

      // check if inputs are valid
      if (Ember.isEmpty(username)) {
        error = true;
        this.set('error_username', true);
      }else {
        this.set('error_password', false);
      }
      if (Ember.isEmpty(password)) {
        error = true;
        this.set('error_password', true);
      } else {
        this.set('error_password', false);
      }

      if (!error) {
        // simulating calling server and getting token
        this.set('error_message', '');
        var url = this.get('domain') + this.get('domain_path');

        var postData = {
          username: username,
          password: password
        }
        console.log(url);
        Ember.$.post(url, postData, function( data ) {
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
              banned: user.banned || false,
              bannedUntil: user.bannedUntil || null,
              isAdmin: user.isAdmin || false
            };

            console.log('USER SETTING bannedUTNIL to ' + user.bannedUntil);

            // overwrite user in applications
            _this.store.push('auth', auth);
            _this.set('controllers.application.auth', auth);

            // make success notification
            _this.get('controllers.application').send('sendNotification', 'Logged in as ' + user.username, 'success');

            var redirect = _this.get('redirect');
            if (redirect) {
              var q = {
                // 'hour', 'ampm', 'date', 'people', 'room_id'
                hour: _this.get('hour'),
                ampm: _this.get('ampm'),
                date: _this.get('date'),
                people: _this.get('people'),
                room_id: _this.get('room_id')
              }
              _this.transitionToRoute(redirect, {queryParams: q});
            } else {
              _this.transitionToRoute('index');
            }
          }
        }).error(function(err) {
          // could not connect to server
          _this.set('error_message', 'Could not connect to server');
        });
      }
    },

    findAuths: function() {
      var auth = this.store.all('auth').objectAt(0);
      console.log(auth.id);
      console.log(auth.get('authToken'));
    },

    redirectAccount: function() {
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
        this.transitionToRoute('register', {queryParams: q});
      } else {
        this.transitionToRoute('register');
      }
    }
  }
});
