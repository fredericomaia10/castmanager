import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Proposals from '../../../api/proposals/proposals.js';
import Polls from '../../../api/polls/polls.js';
import EditPoll from '../../pages/polls/EditPoll.js';
import Loading from '../../components/Loading.js';
import ProposalStatus from '../../../api/commons/proposalStatus';
import PollStatus from '../../../api/commons/pollStatus';
import Enums from '../../../api/commons/enums';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('polls.view', params._id);
  const pollsStatus = Enums.getOptions(PollStatus);
  if (subscription.ready()) {
    const poll = Polls.findOne(params._id);
    const proposals = Proposals.find({ status: ProposalStatus.open.value }).fetch();
    const proposalsIdsSelected = Polls.getProposalIds([poll]);
    onData(null, { poll, proposals, pollsStatus, proposalsIdsSelected });
  }
};

export default composeWithTracker(composer, Loading)(EditPoll);
