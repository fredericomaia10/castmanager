import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeProposal } from '../../../api/proposals/methods.js';

const handleEdit = (_id) => {
  browserHistory.push(`/proposals/${_id}/edit`);
};

const handleRemove = (_id) => {
  if (confirm('Tem certeza?')) {
    removeProposal.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Proposta removida!', 'success');
        browserHistory.push('/proposals');
      }
    });
  }
};

const ViewProposal = ({ doc }) => (
  <div className="ViewProposal">
    <div className="page-header clearfix">
      <h4 className="pull-left">
        { doc && doc.title }, { doc.timeInMinutes } minutos. { doc.categoryLabel }.
        <br/>
        { doc && doc.description }.
      </h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={ () => handleEdit(doc._id) }>Editar</Button>
          <Button onClick={ () => handleRemove(doc._id) } className="text-danger">Remover</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { doc && doc.body }
  </div>
);

ViewProposal.propTypes = {
  doc: React.PropTypes.object,
};

export default ViewProposal;
