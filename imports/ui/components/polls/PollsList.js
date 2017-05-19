import React from 'react';
import { Alert } from 'react-bootstrap';
import PollItemList from './PollItemList';

const PollsList = ({ polls, proposals }) => (
  polls.length > 0 ? <div className="PollsList">
    {polls.map(poll => (
      <PollItemList key={ poll._id } proposals={ proposals } poll={ poll } />
    ))}
  </div> :
  <Alert bsStyle="warning">Nenhuma votação cadastrada.</Alert>
);

PollsList.propTypes = {
  polls: React.PropTypes.array,
  proposals: React.PropTypes.array,
};

export default PollsList;
