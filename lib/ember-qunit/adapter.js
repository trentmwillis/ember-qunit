import Ember from 'ember';
import QUnit from 'qunit';

function noopDone() {}

export default Ember.Test.Adapter.extend({
  init() {
    this.doneCallbacks = [];
  },

  asyncStart() {
    // If an Ember.Test.promise is used outside of a test context, then current
    // will not be defined. In these cases, we use a noop function.
    const current = QUnit.config.current;
    const done = current ? current.assert.async() : noopDone;
    this.doneCallbacks.push(done);
  },

  asyncEnd() {
    this.doneCallbacks.pop()();
  },

  exception(error) {
    QUnit.config.current.assert.ok(false, Ember.inspect(error));
  }
});
