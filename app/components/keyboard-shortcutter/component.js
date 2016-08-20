import Ember from 'ember';
import { EKMixin, keyUp } from 'ember-keyboard';

const { run, on } = Ember;
const KEYBOARD_NAVIGATION_MODE_DURATION = 2000;

export default Ember.Component.extend(EKMixin, {
  tagName: '',

  activateKeyboard: on('init', function() {
    this.set('keyboardActivated', true);
  }),

  onG: on(keyUp('KeyG'), function() {
    this.enterKeyboardNavigationMode();
  }),

  onB: on(keyUp('KeyB'), function() {
    this.navigateTo('site.blog');
  }),

  onH: on(keyUp('KeyH'), function() {
    this.navigateTo('site.index');
  }),

  onR: on(keyUp('KeyR'), function() {
    this.navigateTo('resume');
  }),

  onS: on(keyUp('KeyS'), function() {
    this.navigateTo('styleguide');
  }),

  onT: on(keyUp('KeyT'), function() {
    this.navigateTo('site.talks');
  }),

  onQuestionMark: on(keyUp('shift+Slash'), function() {
    this.set('showCheatSheet', true);
  }),

  dismissCheatSheet: on(keyUp('Escape'), function() {
    this.set('showCheatSheet', false);
  }),

  leaveKeyboardNavigationMode() {
    run.cancel(this.get('keyboardNavigationModeTimer'));
    this.set('keyboardNavigationMode', false);
  },

  enterKeyboardNavigationMode() {
    run.cancel(this.get('keyboardNavigationModeTimer'));
    this.set('keyboardNavigationMode', true);
    this.set('keyboardNavigationModeTimer', run.later(() => {
      this.set('keyboardNavigationMode', false);
    }, KEYBOARD_NAVIGATION_MODE_DURATION));
  },

  navigateTo(route) {
    if (!this.get('keyboardNavigationMode')) {
      return;
    }
    this.leaveKeyboardNavigationMode();
    Ember.getOwner(this).lookup('route:application').transitionTo(route);
  }
});
