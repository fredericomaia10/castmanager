import React from 'react';
import { browserHistory } from 'react-router';
import { ButtonToolbar, ButtonGroup, Button, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import StatusPoll from './StatusPoll';
import { cancelPoll, startPoll, finishPoll, voteProposal } from '../../../api/polls/methods.js';
import { formatDate } from '../../../modules/utils';
import { handleError } from '../../../modules/meteor-utils';

const handleEdit = _id => browserHistory.push(`/polls/${_id}/edit`);

const handleVote = (pollId, proposalId) => {
  if (!confirm('Tem certeza?')) return;
  voteProposal.call({ pollId, proposalId }, (error) => {
    if (error) {
      handleError(error);
    } else {
      Bert.alert('Votacão realizada!', 'success');
      browserHistory.push('/polls');
    }
  });
};

const handleCancel = (_id) => {
  if (!confirm('Tem certeza?')) return;
  cancelPoll.call({ _id }, (error) => {
    if (error) {
      handleError(error);
    } else {
      Bert.alert('Votacão cancelada!', 'success');
      browserHistory.push('/polls');
    }
  });
};

const handleStartPoll = (_id) => {
  if (!confirm('Tem certeza?')) return;
  startPoll.call({ _id }, (error) => {
    if (error) {
      handleError(error);
    } else {
      Bert.alert('Votacão iniciada!', 'success');
      browserHistory.push('/polls');
    }
  });
};

const handleFinishPoll = (_id) => {
  if (!confirm('Tem certeza?')) return;
  finishPoll.call({ _id }, (error) => {
    if (error) {
      handleError(error);
    } else {
      Bert.alert('Votacão encerrada!', 'success');
      browserHistory.push('/polls');
    }
  });
};

const PollItemList = ({ poll, proposals }) => (
  <Row key={ poll._id } style={ { borderBottom: '1px solid #eee', marginBottom: 20 }}>
    <Col md={ 9 }>
      <p>
        Período:&nbsp;
        <span style={ { fontWeight: 'bold' } }>&nbsp;
          { formatDate(poll.startDate) } - { formatDate(poll.finishDate) }
          </span>
        <StatusPoll poll={ poll } />
      </p>
      <p>
        <Button onClick={ () => handleStartPoll(poll._id) }
                className={ poll.canStart() ? '' : 'hidden' }>Iniciar votação</Button>
        <Button onClick={ () => handleFinishPoll(poll._id) }
                className={ poll.canFinish() ? '' : 'hidden' }>Encerrar votação</Button>
      </p>
      <ListGroup>
        {poll.proposals.map((p) => {
          const proposal = proposals.find(prop => prop._id === p._id);
          return (
            <ListGroupItem key={ p._id }>
              {`${proposal.title} (${p.numberOfVotes} votos)`}
              <Button bsSize="xsmall" bsStyle="primary"
                      className={ !poll.isStarted() ? 'pull-right hidden' : 'pull-right' }
                      onClick={ () => handleVote(poll._id, proposal._id) }>Votar</Button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </Col>
    <Col md={ 3 }>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={ () => handleEdit(poll._id) }
                  disabled={ !poll.isEditable() }>Editar</Button>
          <Button onClick={ () => handleCancel(poll._id) }
                  disabled={ !poll.isCancelable() }
                  bsStyle="danger">Cancelar</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Col>
  </Row>
);

PollItemList.propTypes = {
  poll: React.PropTypes.object,
  proposals: React.PropTypes.array,
};

export default PollItemList;
