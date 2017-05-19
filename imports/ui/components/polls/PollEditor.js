/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import pollEditor from '../../../modules/poll-editor.js';
import PollsStatusItems from '../pollStatus/PollsStatusItems';
import { formatDate } from '../../../modules/utils.js';

export default class PollEditor extends React.Component {
  componentDidMount() {
    pollEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="startDate"]').focus(); }, 0);
  }

  render() {
    const { poll } = this.props;
    const { proposals } = this.props;
    const { pollsStatus } = this.props;
    const { proposalsIdsSelected } = this.props;
    return (
      <form ref={ form => (this.proposalEditorForm = form) }
        onSubmit={ e => e.preventDefault() }>
      <Row>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Data de Início</ControlLabel>
            <FormControl type="text" name="startDate"
                         defaultValue={ poll && formatDate(poll.startDate) }
                         placeholder="Data de Início" />
          </FormGroup>
        </Col>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Data de Fim</ControlLabel>
            <FormControl type="text" name="finishDate"
                         defaultValue={ poll && formatDate(poll.finishDate) }
                         placeholder="Data de Fim" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Temas</ControlLabel>
            <FormControl componentClass="select" name="proposals" multiple
                defaultValue={ proposalsIdsSelected }>
              { proposals.map(p => (
                <option value={ p._id } key={ p._id }>
                  { p.title }
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Status</ControlLabel>
            <PollsStatusItems defaultValue={ poll && poll.status }
                              pollsStatus={ pollsStatus } disabled={ true } />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" bsStyle="success">Salvar como Rascunho</Button>
    </form>
    );
  }
}

PollEditor.propTypes = {
  poll: React.PropTypes.object,
  proposals: React.PropTypes.array,
  pollsStatus: React.PropTypes.array,
  proposalsIdsSelected: React.PropTypes.array,
};
