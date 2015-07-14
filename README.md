# Fox-karaoke

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

The application has 2 components which need to be run
- Ember frontend (the actual html and what the user will see)
- Node API server (what connects with the database and manages data)

#### Ember frontend

* `ember server` Builds and serves app at [http://localhost:7100](http://localhost:7100).
* port can be customized with `ember server --port PORT`

* `ember build` Builds app to dist/ directory

### Node backend

* `cd RESTServer`
* `nodemon`
OR
* `node ./bin/api.js`

This will run the api server at [http://localhost:7000](http://localhost:7000)

The app uses a mongo server hosted on MongoLab

### Further Reading

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
  * 
  
### Admin User Testing

*A user needs to be logged in as an Admin in order to disable rooms if they need to be made unbookable for any reason.
*Username: admin
*Password: admin

