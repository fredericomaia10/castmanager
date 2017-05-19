/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import Companies from './companies.js';
import { insertCompany } from './methods.js';

describe('Companies methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserir uma empresa na collection de Companies', function () {
    insertCompany.call({
      name: 'Company Test',
      phone: '21990121020',
      typeOfServiceId: '1',
      ownerId: '123456',
    });

    const company = Companies.findOne({ name: 'Company Test' });
    assert.equal(company.ownerId, '123456');
    assert.equal(company.phone, '21990121020');
  });
});
