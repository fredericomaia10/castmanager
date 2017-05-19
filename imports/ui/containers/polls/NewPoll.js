import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import NewPoll from '../../pages/polls/NewPoll.js';
import Loading from '../../components/Loading.js';
import Proposals from '../../../api/proposals/proposals';
import ProposalStatus from '../../../api/commons/proposalStatus';
import PollStatus from '../../../api/commons/pollStatus';
import Enums from '../../../api/commons/enums';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('polls.new');
  const pollsStatus = Enums.getOptions(PollStatus);
  if (subscription.ready()) {
    const proposals = Proposals.find({ status: ProposalStatus.open.value }).fetch();
    onData(null, { proposals, pollsStatus });
  }
};

export default composeWithTracker(composer, Loading)(NewPoll);
