import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PollEditor from '../../components/polls/PollEditor.js';

const EditPoll = ({ poll, proposals, pollsStatus, proposalsIdsSelected }) => (
  <div className="EditPoll">
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        <h4 className="page-header">Editando</h4>
        <PollEditor poll={ poll }
                    proposals={ proposals }
                    pollsStatus={ pollsStatus }
                    proposalsIdsSelected={ proposalsIdsSelected }/>
      </Col>
    </Row>
  </div>
);

EditPoll.propTypes = {
  poll: React.PropTypes.object,
  proposals: React.PropTypes.array,
  pollsStatus: React.PropTypes.array,
  proposalsIdsSelected: React.PropTypes.array,
};

export default EditPoll;
