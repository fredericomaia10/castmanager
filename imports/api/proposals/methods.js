import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Proposals from './proposals';
import ProposalStatus from '../commons/proposalStatus';
import Users from '../users/users';
import { throwExceptionNotAllowed, throwException } from '../../modules/meteor-utils';
import rateLimit from '../../modules/rate-limit.js';

const checkLoggedUserIsAdmin = () => {
  if (Users.isNotLoggedUserAdmin()) {
    throwExceptionNotAllowed();
  }
};

const changeStatusTo = (proposalIds, status) => Proposals.update({ _id: { $in: proposalIds } }, {
  $set: {
    status: status.value,
  } },
  { multi: true }
);

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
    proposal.status = ProposalStatus.open.value;
    return Proposals.upsert({ _id: proposal._id }, { $set: proposal });
  },
});

export const changeProposalsToVoting = new ValidatedMethod({
  name: 'proposals.changeProposalsToVoting',
  validate: new SimpleSchema({
    proposalIds: { type: [String] },
  }).validator(),
  run({ proposalIds }) {
    checkLoggedUserIsAdmin();
    const query = { _id: { $in: proposalIds } };
    const fields = { _id: 1, status: 1 };
    const proposals = Proposals.find(query, { fields }).fetch();
    if (proposals.find(p => !p.isOpen())) {
      throwException('Somente propostas em aberto podem ir para votação.');
    }
    return changeStatusTo(proposalIds, ProposalStatus.voting);
  },
});

export const changeProposalsToOpen = new ValidatedMethod({
  name: 'proposals.changeProposalsToOpen',
  validate: new SimpleSchema({
    proposalIds: { type: [String] },
  }).validator(),
  run({ proposalIds }) {
    checkLoggedUserIsAdmin();
    const query = { _id: { $in: proposalIds } };
    const fields = { _id: 1, status: 1 };
    const proposals = Proposals.find(query, { fields }).fetch();
    if (proposals.find(p => !p.isVoting() && !p.isOpen())) {
      throwException('Somente propostas em votação podem voltar para em aberto.');
    }
    return changeStatusTo(proposalIds, ProposalStatus.open);
  },
});

export const changeProposalsToElected = new ValidatedMethod({
  name: 'proposals.changeProposalsToElected',
  validate: new SimpleSchema({
    proposalIds: { type: [String] },
  }).validator(),
  run({ proposalIds }) {
    checkLoggedUserIsAdmin();
    const query = { _id: { $in: proposalIds } };
    const fields = { _id: 1, status: 1 };
    const proposals = Proposals.find(query, { fields }).fetch();
    if (proposals.find(p => !p.isVoting())) {
      throwException('Somente propostas em votação podem ser eleitas.');
    }
    return changeStatusTo(proposalIds, ProposalStatus.elected);
  },
});

export const removeProposal = new ValidatedMethod({
  name: 'proposals.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    return Proposals.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertProposal,
    removeProposal,
    changeProposalsToOpen,
    changeProposalsToVoting,
    changeProposalsToElected,
  ],
  limit: 5,
  timeRange: 1000,
});
