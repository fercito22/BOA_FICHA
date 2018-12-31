import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | documentos/documentos-personales', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:documentos/documentos-personales');
    assert.ok(route);
  });
});
