/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import Proposals from './proposals.js';

describe('Proposals collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Proposals, 'object');
  });
});
