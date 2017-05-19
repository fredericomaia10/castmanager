import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Proposals from '../proposals';

Meteor.publish('proposals.list', () => Proposals.find());

Meteor.publish('proposals.listByUser', (userId) => {
  check(userId, String);
  return Proposals.find({ userId });
});

Meteor.publish('proposals.view', (_id) => {
  check(_id, String);
  return Proposals.find(_id);
});
