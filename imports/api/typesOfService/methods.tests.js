/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import TypesOfService from './typesOfService.js';
import { insertTypesOfService } from './methods.js';

describe('TypesOfService methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserir um tipo de serviço', function () {
    insertTypesOfService.call({
      name: 'Type Test',
      active: true,
    });

    const typeOfService = TypesOfService.findOne({ name: 'Type Test' });
    assert.equal(typeOfService.active, true);
  });
});
