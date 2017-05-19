import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Alert, ButtonToolbar, ButtonGroup, Button, Label, Row, Col } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeProposal } from '../../../api/proposals/methods.js';

const loggedUserId = () => Meteor.userId();

const handleEdit = _id => browserHistory.push(`/proposals/${_id}/edit`);

const ownerName = (userId) => {
  const user = Meteor.users.findOne(userId);
  return user ? user.profile.name : 'Anônimo';
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

const ProposalsList = ({ proposals }) => (
  proposals.length > 0 ? <div className="ProposalsList">
    {proposals.map(p => (
      <Row key={ p._id } style={ { borderBottom: '1px solid #eee', marginBottom: 20 }}>
        <Col md={ 10 }>
          <span style={ { fontWeight: 'bold' } }>{ p.title }</span>
          <Label bsStyle="default" style={ { marginLeft: 15 } }>{ p.categoryLabel }</Label>
          <p style={ { color: 'gray' } }>{ ownerName(p.userId) }, { p.timeInMinutes } minutos.</p>
          <p>{ p.description }</p>
        </Col>
        <Col md={ 2 }>
          <ButtonToolbar className="pull-right">
            <ButtonGroup bsSize="small">
              <Button onClick={ () => handleEdit(p._id) }
                      disabled={ loggedUserId() !== p.userId }>Editar</Button>
              <Button onClick={ () => handleRemove(p._id) }
                      disabled={ loggedUserId() !== p.userId }
                      bsStyle="danger">Remover</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
    ))}
  </div> :
  <Alert bsStyle="warning">Nenhuma proposta de tema cadastrada.</Alert>
);

ProposalsList.propTypes = {
  proposals: React.PropTypes.array,
};

export default ProposalsList;
