import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Polls from '../../../api/polls/polls.js';
import Proposals from '../../../api/proposals/proposals.js';
import PollsList from '../../components/polls/PollsList.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('polls.list');
  if (subscription.ready()) {
    const polls = Polls.find({}, { $sort: { createdAt: 1 } }).fetch();
    const proposals = Proposals.find({}, { $sort: { title: -1 } }).fetch();
    onData(null, { polls, proposals });
  }
};

export default composeWithTracker(composer, Loading)(PollsList);
