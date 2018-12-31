import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | principal/formulario-idiomas', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:principal/formulario-idiomas');
    assert.ok(route);
  });
});
