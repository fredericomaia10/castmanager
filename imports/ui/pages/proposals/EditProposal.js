import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProposalEditor from '../../components/proposals/ProposalEditor.js';

const EditProposal = ({ doc, proposalsStatus }) => (
  <div className="EditProposal">
    <Row>
      <Col md={ 6 } mdOffset={ 3 }>
        <h4 className="page-header">Editando "{ doc.title }"</h4>
        <ProposalEditor doc={ doc } proposalsStatus={ proposalsStatus }/>
      </Col>
    </Row>
  </div>
);

EditProposal.propTypes = {
  doc: React.PropTypes.object,
  proposalsStatus: React.PropTypes.array,
};

export default EditProposal;
