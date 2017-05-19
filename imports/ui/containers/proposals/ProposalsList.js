import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Proposals from '../../../api/proposals/proposals.js';
import ProposalsList from '../../components/proposals/ProposalsList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const proposalsSubscription = params.allProposals ?
    Meteor.subscribe('proposals.list') :
    Meteor.subscribe('proposals.listByUser', Meteor.userId());
  if (proposalsSubscription.ready()) {
    const proposals = Proposals.findWithCategoryLabel();
    const usersIds = proposals.map(p => p.userId);
    const userSubscription = Meteor.subscribe('users.proposals.list', usersIds);
    if (userSubscription.ready()) {
      onData(null, { proposals });
    }
  }
};

export default composeWithTracker(composer, Loading)(ProposalsList);
