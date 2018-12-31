import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | estudios', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:estudios');
    assert.ok(route);
  });
});
