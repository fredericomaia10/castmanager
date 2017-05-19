import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Proposals from './proposals';
import rateLimit from '../../modules/rate-limit.js';

export const upsertProposal = new ValidatedMethod({
  name: 'proposals.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    description: { type: String, optional: true },
    category: { type: String, optional: true },
    timeInMinutes: { type: Number, optional: true },
  }).validator(),
  run(proposal) {
    return Proposals.upsert({ _id: proposal._id }, { $set: proposal });
  },
});

export const removeProposal = new ValidatedMethod({
  name: 'proposals.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Proposals.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertProposal,
    removeProposal,
  ],
  limit: 5,
  timeRange: 1000,
});
