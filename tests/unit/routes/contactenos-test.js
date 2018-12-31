import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contactenos', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contactenos');
    assert.ok(route);
  });
});
