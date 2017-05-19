import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProposalEditor from '../../components/proposals/ProposalEditor.js';

const NewProposal = ({ proposalsStatus }) => (
  <div className="NewProposal">
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        <h4 className="page-header">Nova Proposta de Tema</h4>
        <ProposalEditor proposalsStatus={ proposalsStatus } />
      </Col>
    </Row>
  </div>
);

NewProposal.propTypes = {
  proposalsStatus: React.PropTypes.array,
};

export default NewProposal;
