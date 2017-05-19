import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.account.settings', () => Meteor.users.find({ _id: this.userId }));

Meteor.publish('users.proposals.list', (usersIds) => {
  check(usersIds, [String]);
  return Meteor.users.find({ _id: { $in: usersIds } }, { fields: { _id: 1, profile: 1 } });
});
