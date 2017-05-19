import { composeWithTracker } from 'react-komposer';
import NewProposal from '../../pages/proposals/NewProposal.js';
import Loading from '../../components/Loading.js';
import ProposalStatus from '../../../api/commons/proposalStatus';
import Enums from '../../../api/commons/enums';

const composer = ({ params }, onData) => {
  const proposalsStatus = Enums.getOptions(ProposalStatus);
  onData(null, { pollsStatus });
};

export default composeWithTracker(composer, Loading)(NewProposal);
