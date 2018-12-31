import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | principal/idiomas', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:principal/idiomas');
    assert.ok(route);
  });
});
