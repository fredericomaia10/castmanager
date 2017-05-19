/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Proposals from './proposals.js';
import { upsertProposal, removeProposal } from './methods.js';

describe('Proposals methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a proposal into the Proposals collection', function () {
    upsertProposal.call({
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getProposal = Proposals.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getProposal.body, 'They went nuts!');
  });

  it('updates a proposal in the Proposals collection', function () {
    const { _id } = Factory.create('proposal');

    upsertProposal.call({
      _id,
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getProposal = Proposals.findOne(_id);
    assert.equal(getProposal.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a proposal from the Proposals collection', function () {
    const { _id } = Factory.create('proposal');
    removeProposal.call({ _id });
    const getProposal = Proposals.findOne(_id);
    assert.equal(getProposal, undefined);
  });
});
