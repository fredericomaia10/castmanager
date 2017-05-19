/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import TypesOfService from './typesOfService.js';

describe('TypesOfService collection', function () {
  it('registra a collection TypesOfService (Tipos de Serviço) no Mongo', function () {
    assert.equal(typeof TypesOfService, 'object');
  });
});
