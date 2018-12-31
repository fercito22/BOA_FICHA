import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | documentos-personales', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:documentos-personales');
    assert.ok(route);
  });
});
