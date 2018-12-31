import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | perfil', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:perfil');
    assert.ok(route);
  });
});
