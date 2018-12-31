import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | formulario-perfil', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:formulario-perfil');
    assert.ok(route);
  });
});
