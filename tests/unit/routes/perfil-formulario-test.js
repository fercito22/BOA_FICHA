import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | perfil-formulario', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:perfil-formulario');
    assert.ok(route);
  });
});
