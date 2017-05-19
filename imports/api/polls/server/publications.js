import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Polls from '../polls';
import ProposalStatus from '../../commons/proposalStatus';
import Proposals from '../../proposals/proposals';

Meteor.publish('polls.new', () => {
  const proposalFields = { _id: 1, title: 1, status: 1 };
  const proposalQuery = { status: ProposalStatus.open.value };
  return Proposals.find(proposalQuery, { fields: proposalFields });
});

Meteor.publish('polls.list', () => {
  const polls = Polls.find();
  const proposalsIds = Polls.getProposalIds(polls.fetch());
  const proposals = Proposals.find({ _id: { $in: proposalsIds } });
  const usersIds = proposals.fetch().map(p => p.userId);
  const users = Meteor.users.find({ _id: { $in: usersIds } });
  return [
    polls, proposals, users,
  ];
});

Meteor.publish('polls.view', (_id) => {
  check(_id, String);
  const polls = Polls.find({ _id });
  const proposalsIds = Polls.getProposalIds(polls.fetch());
  const proposals = Proposals.find({ _id: { $in: proposalsIds } });
  return [
    polls, proposals,
  ];
});
