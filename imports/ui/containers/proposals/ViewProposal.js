import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Proposals from '../../../api/proposals/proposals.js';
import ViewProposal from '../../pages/proposals/ViewProposal.js';
import Loading from '../../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('proposals.view', params._id);

  if (subscription.ready()) {
    const doc = Proposals.findOneWithCategoryLabel(params._id);
    onData(null, { doc });
  }
};

export default composeWithTracker(composer, Loading)(ViewProposal);
