import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import PollStatus from '../commons/pollStatus';
import Polls from './polls';
import rateLimit from '../../modules/rate-limit.js';

export const upsertPoll = new ValidatedMethod({
  name: 'polls.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    startDate: { type: Date, optional: true },
    finishDate: { type: Date, optional: true },
    proposals: { type: [String], optional: true },
  }).validator(),
  run(poll) {
    if (poll._id) {
      const pollSaved = Polls.findOne(poll._id, { fields: { _id: 1, status: 1 } });
      if (pollSaved) {
        Polls.validateStatusIsNot(pollSaved, PollStatus.draft.value);
      }
    }
    const pollUpsert = {
      _id: poll._id,
      startDate: poll.startDate,
      finishDate: poll.finishDate,
      proposals: poll.proposals.map(p => ({ _id: p, numberOfVotes: 0, usersIds: [] })),
      status: PollStatus.draft.value,
    };
    return Polls.upsert({ _id: pollUpsert._id }, { $set: pollUpsert });
  },
});

export const startPoll = new ValidatedMethod({
  name: 'polls.start',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const pollSaved = Polls.findOne(_id, { fields: { _id: 1, status: 1 } });
    Polls.validateStatusIsNot(pollSaved, PollStatus.draft.value);
    Polls.update(_id, {
      $set: {
        status: PollStatus.started.value,
      },
    });
  },
});

export const finishPoll = new ValidatedMethod({
  name: 'polls.finish',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const pollSaved = Polls.findOne(_id, { fields: { _id: 1, status: 1 } });
    Polls.validateStatusIsNot(pollSaved, PollStatus.started.value);
    Polls.update(_id, {
      $set: {
        status: PollStatus.finished.value,
      },
    });
  },
});

export const cancelPoll = new ValidatedMethod({
  name: 'polls.cancel',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const pollSaved = Polls.findOne(_id, { fields: { _id: 1, status: 1 } });
    Polls.validateStatusIs(pollSaved, PollStatus.finished.value);
    Polls.update(_id, {
      $set: {
        status: PollStatus.canceled.value,
      },
    });
  },
});

export const voteProposal = new ValidatedMethod({
  name: 'polls.vote',
  validate: new SimpleSchema({
    pollId: { type: String },
    proposalId: { type: String },
  }).validator(),
  run({ pollId, proposalId }) {
    const pollSaved = Polls.findOne(pollId, { fields: { _id: 1, status: 1, proposals: 1 } });
    Polls.validateStatusIsNot(pollSaved, PollStatus.started.value);
    Polls.voteProposal(pollSaved, proposalId, Meteor.user()._id);
    Polls.update(pollId, {
      $set: {
        proposals: pollSaved.proposals,
      },
    });
  },
});

rateLimit({
  methods: [upsertPoll, cancelPoll],
  limit: 5,
  timeRange: 1000,
});
