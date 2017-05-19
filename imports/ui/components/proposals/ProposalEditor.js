/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import proposalEditor from '../../../modules/proposal-editor.js';
import ProposalsStatusItems from '../proposalStatus/ProposalsStatusItems';

export default class ProposalEditor extends React.Component {
  componentDidMount() {
    proposalEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { doc } = this.props;
    const { proposalsStatus } = this.props;
    const isNew = !doc;
    return (
      <form ref={ form => (this.proposalEditorForm = form) }
        onSubmit={ e => e.preventDefault() }>
      <Row>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Título</ControlLabel>
            <FormControl type="text" name="title" defaultValue={ doc && doc.title }
              placeholder="Título da proposta" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Tempo em minutos</ControlLabel>
            <FormControl componentClass="select" name="timeInMinutes"
                         defaultValue={ doc && doc.timeInMinutes }>
              <option value="25">25 minutos</option>
              <option value="50">50 minutos</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Categoria</ControlLabel>
            <FormControl componentClass="select" name="category" defaultValue={ doc && doc.category }>
              <option value="tecnico">Técnico</option>
              <option value="nao-tecnico">Não Técnico</option>
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <ControlLabel>Descrição</ControlLabel>
        <FormControl componentClass="textarea" name="proposalDescription"
                     defaultValue={ doc && doc.description }
                     placeholder="Descrição da sua proposta de tema..." />
      </FormGroup>
      <Row>
        <Col xs={ 12 } className={ isNew ? 'hide' : '' }>
          <FormGroup>
            <ControlLabel>Status</ControlLabel>
            <ProposalsStatusItems defaultValue={ doc && doc.status }
                                  proposalsStatus={ proposalsStatus } disabled={ true } />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" bsStyle="success">Salvar</Button>
    </form>
    );
  }
}

ProposalEditor.propTypes = {
  doc: React.PropTypes.object,
  proposalsStatus: React.PropTypes.array,
};
