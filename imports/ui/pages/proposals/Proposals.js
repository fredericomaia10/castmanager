import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import ProposalsList from '../../containers/proposals/ProposalsList.js';

export default class Proposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProposals: false,
    };
  }

  showAllProposals() {
    this.setState({
      allProposals: true,
    });
  }

  showMyProposals() {
    this.setState({
      allProposals: false,
    });
  }

  render() {
    return (
      <div className="Proposals">
        <Row>
          <Col xs={ 12 }>
            <div className="page-header clearfix">
              <h4 className="pull-left">Propostas</h4>
              <Link to="/proposals/new">
                <Button bsStyle="success" className="pull-right">
                  Nova Proposta</Button>
              </Link>
            </div>
            <div>
              <ButtonToolbar style={ { marginBottom: 20 }}>
                <ButtonGroup bsSize="small">
                  <Button onClick={ this.showMyProposals.bind(this) } className={ !this.state.allProposals ? 'active' : '' }
                          readOnly={ !this.state.allProposals }>
                    Ver minhas propostas</Button>
                  <Button onClick={ this.showAllProposals.bind(this) } className={ this.state.allProposals ? 'active' : '' }
                          readOnly={ this.state.allProposals }>
                    Ver todas propostas</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
            <ProposalsList allProposals={ this.state.allProposals } />
          </Col>
        </Row>
      </div>
    );
  }
}
