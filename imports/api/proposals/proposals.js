import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import MetaSchema from '../commons/metaSchema';
import Enums from '../commons/enums';
import ProposalStatus from '../commons/proposalStatus';

const Proposals = new Mongo.Collection('proposals');

Proposals.schema = new SimpleSchema([MetaSchema, {
  title: {
    type: String,
    label: 'Título da proposta.',
  },
  description: {
    type: String,
    label: 'Descrição da proposta.',
  },
  category: {
    type: String,
    label: 'Categoria da proposta.',
    allowedValues: ['tecnico', 'nao-tecnico'], // TODO obter do settings
  },
  timeInMinutes: {
    type: Number,
    label: 'Tempo em minutos da proposta.',
  },
  status: {
    type: String,
    label: 'Status da proposta.',
    allowedValues: Enums.getValues(ProposalStatus),
  },
}]);

Proposals.categories = () => Meteor.settings.public.categories;

Proposals.findWithCategoryLabel = () => {
  const categories = Proposals.categories();
  const proposals = Proposals.find().fetch();
  return proposals.map((p) => {
    const proposal = p;
    proposal.categoryLabel = categories[p.category];
    return proposal;
  });
};

Proposals.findOneWithCategoryLabel = (_id) => {
  const categories = Proposals.categories();
  const p = Proposals.findOne(_id);
  const proposal = p;
  proposal.categoryLabel = categories[p.category];
  return proposal;
};

Proposals.helpers({
  isStatus(status) {
    return this.status === status.value;
  },
  isOpen() {
    return this.isStatus(ProposalStatus.open);
  },
  isVoting() {
    return this.isStatus(ProposalStatus.voting);
  },
  isCanceled() {
    return this.isStatus(ProposalStatus.canceled);
  },
  isElected() {
    return this.isStatus(ProposalStatus.elected);
  },
});

export default Proposals;

Proposals.attachSchema(Proposals.schema);

Factory.define('proposal', Proposals, {
  title: () => 'Factory Title',
  description: () => 'Factory Body',
  userId: () => '123',
});

Proposals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Proposals.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
