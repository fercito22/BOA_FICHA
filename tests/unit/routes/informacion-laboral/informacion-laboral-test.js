import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | informacion-laboral/informacion-laboral', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:informacion-laboral/informacion-laboral');
    assert.ok(route);
  });
});
