import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import MetaSchema from '../commons/metaSchema';
import Enums from '../commons/enums';
import Users from '../users/users';
import PollStatus from '../commons/pollStatus';
import { throwException } from '../../modules/meteor-utils';

const Polls = new Mongo.Collection('polls');

Polls.schema = new SimpleSchema([MetaSchema, {
  startDate: {
    type: Date,
    label: 'Início da votação.',
  },
  finishDate: {
    type: Date,
    label: 'Fim da votação.',
  },
  'proposals.$._id': {
    type: String,
    label: 'Id da proposta em votação.',
  },
  'proposals.$.numberOfVotes': {
    type: Number,
    label: 'Quantidade de votos da proposta em votação.',
    optional: true,
  },
  'proposals.$.usersIds': {
    type: [String],
    label: 'Ids dos usuários que votaram.',
    optional: true,
  },
  proposalWinningId: {
    type: String,
    optional: true,
    label: 'Ids da propostas vencedora.',
  },
  status: {
    type: String,
    label: 'Status da votação.',
    allowedValues: Enums.getValues(PollStatus),
  },
}]);

Polls.helpers({
  isStatus(status) {
    return this.status === status.value;
  },
  isDraft() {
    return this.isStatus(PollStatus.draft);
  },
  isStarted() {
    return this.isStatus(PollStatus.started);
  },
  isCanceled() {
    return this.isStatus(PollStatus.canceled);
  },
  isFinished() {
    return this.isStatus(PollStatus.finished);
  },
  loggedUserIsOwner() {
    return Meteor.userId() === this.userId;
  },
  isEditable() {
    return Users.isLoggedUserAdmin() && this.isDraft();
  },
  isCancelable() {
    return Users.isLoggedUserAdmin() && !this.isFinished() && !this.isCanceled();
  },
  canStart() {
    return Users.isLoggedUserAdmin() && this.isDraft();
  },
  canFinish() {
    return Users.isLoggedUserAdmin() && this.isStarted();
  },
});

Polls.getProposalIds = polls => polls.map(poll => poll.proposals)
  .reduce((previous, current) => previous.concat(current))
  .map(proposal => proposal._id);

Polls.voteProposal = (poll, proposalId, userId) => {
  const usersIds = poll.proposals
    .map(p => p.usersIds)
    .filter(u => u.length > 0)
    .reduce((previous, current) => previous.concat(current), []);
  const userAlreadyVoted = usersIds.find(u => u === userId);
  if (userAlreadyVoted) {
    throwException('Você já efetuou seu voto.');
  }
  const proposal = poll.proposals.find(p => p._id === proposalId);
  proposal.numberOfVotes += 1;
  if (proposal.usersIds) {
    proposal.usersIds.push(userId);
  } else {
    proposal.usersIds = [userId];
  }
};

Polls.changeVoteProposal = (poll, proposalId, userId) => {
  const usersIds = poll.proposals
    .map(p => p.usersIds)
    .filter(u => u.length > 0)
    .reduce((previous, current) => previous.concat(current));
  const userAlreadyVoted = usersIds.find(u => u === userId);
  if (userAlreadyVoted) {
    throwException('Você já efetuou seu voto.');
  }
  const proposal = poll.proposals.find(p => p._id === proposalId);
  proposal.numberOfVotes += 1;
  if (proposal.usersIds) {
    proposal.usersIds.push(userId);
  } else {
    proposal.usersIds = [userId];
  }
};

Polls.validateStatusIs = (poll, status) => {
  if (poll && poll.status === status) {
    const statusFound = Enums.getLabelByValue(PollStatus, poll.status);
    throwException(`Ação não permitida. Votação com status ${statusFound}.`);
  }
};

Polls.validateStatusIsNot = (poll, status) => {
  if (poll && poll.status !== status) {
    const statusFound = Enums.getLabelByValue(PollStatus, poll.status);
    throwException(`Ação não permitida. Votação com status ${statusFound}.`);
  }
};

export default Polls;

Polls.attachSchema(Polls.schema);

Polls.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Polls.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
