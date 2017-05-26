import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Users from '../users/users';
import PollStatus from '../commons/pollStatus';
import Polls from './polls';
import { changeProposalsToVoting, changeProposalsToOpen, changeProposalsToElected } from '../proposals/methods';
import { throwExceptionNotAllowed, throwException, throwExceptionIf } from '../../modules/meteor-utils';
import rateLimit from '../../modules/rate-limit.js';

const checkLoggedUserIsAdmin = () => {
  if (Users.isNotAdmin(Meteor.userId())) {
    throwExceptionNotAllowed();
  }
};

export const upsertPoll = new ValidatedMethod({
  name: 'polls.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    startDate: { type: Date, optional: true },
    finishDate: { type: Date, optional: true },
    proposals: { type: [String], optional: true },
  }).validator(),
  run(poll) {
    checkLoggedUserIsAdmin();
    if (poll._id) {
      const pollSaved = Polls.findOne(poll._id, { fields: { _id: 1, status: 1 } });
      if (pollSaved) {
        Polls.validateStatusIs(pollSaved, PollStatus.draft);
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

const changeStatusTo = (pollId, status) => Polls.update({ _id: pollId }, {
  $set: {
    status: status.value,
  },
});

// TODO checar todos os métodos de sart, cancel e finish
export const startPoll = new ValidatedMethod({
  name: 'polls.start',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    checkLoggedUserIsAdmin();
    const fields = { _id: 1, status: 1, proposals: 1 };
    const pollSaved = Polls.find(_id, { fields }).fetch()[0];
    if (!pollSaved) {
      throwException('Votação não encontrada.');
    }
    Polls.validateStatusIs(pollSaved, PollStatus.draft);
    const proposalIds = Polls.getProposalIds([pollSaved]);
    if (changeProposalsToVoting.call({ proposalIds })) {
      return changeStatusTo(_id, PollStatus.started);
    }
    return false;
  },
});

export const finishPoll = new ValidatedMethod({
  name: 'polls.finish',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    checkLoggedUserIsAdmin();
    const fields = { _id: 1, status: 1, proposals: 1 };
    const pollSaved = Polls.find(_id, { fields }).fetch()[0];
    if (!pollSaved) {
      throwException('Votação não encontrada.');
    }
    const proposalVotes = pollSaved.proposals.map(p => p.numberOfVotes);
    if (proposalVotes.every(votes => votes === 0)) {
      throwException('Votação sem votos não pode ser encerrada. Faça o cancelamento.');
    }
    Polls.validateStatusIs(pollSaved, PollStatus.started);
    const proposalIds = Polls.getProposalIds([pollSaved]);
    if (changeProposalsToOpen.call({ proposalIds })) {
      const higgestVotedProposals = pollSaved.higgestVotedProposals();
      throwExceptionIf(() => higgestVotedProposals.length > 1, 'Votação empatada.');
      const proposalId = higgestVotedProposals[0]._id;
      if (changeProposalsToElected.call({ proposalIds: [proposalId] })) {
        return Polls.update(_id, {
          $set: {
            status: PollStatus.finished.value,
            proposalWinningId: proposalId,
          },
        });
      }
    }
    return false;
  },
});

export const cancelPoll = new ValidatedMethod({
  name: 'polls.cancel',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    checkLoggedUserIsAdmin();
    const fields = { _id: 1, status: 1, proposals: 1 };
    const pollSaved = Polls.find(_id, { fields }).fetch()[0];
    throwExceptionIf(() => !pollSaved, 'Votação não encontrada.');
    Polls.validateStatusIsNot(pollSaved, PollStatus.finished);
    const proposalIds = Polls.getProposalIds([pollSaved]);
    if (changeProposalsToOpen.call({ proposalIds })) {
      return changeStatusTo(_id, PollStatus.canceled);
    }
    return false;
  },
});

export const voteProposal = new ValidatedMethod({
  name: 'polls.vote',
  validate: new SimpleSchema({
    pollId: { type: String },
    proposalId: { type: String },
  }).validator(),
  run({ pollId, proposalId }) {
    const fields = { _id: 1, status: 1, proposals: 1 };
    const pollSaved = Polls.find(pollId, { fields }).fetch()[0];
    throwExceptionIf(() => !pollSaved, 'Votação não encontrada.');
    Polls.validateStatusIs(pollSaved, PollStatus.started);
    Polls.voteProposal(pollSaved, proposalId, Meteor.user()._id);
    return Polls.update(pollId, {
      $set: {
        proposals: pollSaved.proposals,
      },
    });
  },
});

rateLimit({
  methods: [upsertPoll, cancelPoll, finishPoll, startPoll, voteProposal],
  limit: 5,
  timeRange: 1000,
});
