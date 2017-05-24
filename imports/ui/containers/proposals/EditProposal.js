import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Proposals from '../../../api/proposals/proposals.js';
import EditProposal from '../../pages/proposals/EditProposal.js';
import Loading from '../../components/Loading.js';
import ProposalStatus from '../../../api/commons/proposalStatus';
import Enums from '../../../api/commons/enums';

const composer = ({ params }, onData) => {
  Meteor.subscribe('users.account.settings');
  const subscription = Meteor.subscribe('proposals.view', params._id);
  const proposalsStatus = Enums.getOptions(ProposalStatus);
  if (subscription.ready()) {
    const doc = Proposals.findOne(params._id);
    onData(null, { doc, proposalsStatus });
  }
};

export default composeWithTracker(composer, Loading)(EditProposal);
