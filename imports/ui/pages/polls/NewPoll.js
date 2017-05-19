import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PollEditor from '../../components/polls/PollEditor.js';

const NewPoll = ({ proposals, pollsStatus }) => (
  <div className="NewPoll">
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        <h4 className="page-header">Nova Votação</h4>
        <PollEditor proposals={ proposals } pollsStatus={ pollsStatus } />
      </Col>
    </Row>
  </div>
);

NewPoll.propTypes = {
  proposals: React.PropTypes.array,
  pollsStatus: React.PropTypes.array,
};

export default NewPoll;
