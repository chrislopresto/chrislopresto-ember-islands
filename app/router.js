import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('ember-modal-dialog-intro');
  this.route('living-style-guide-driven-development');
});

export default Router;
