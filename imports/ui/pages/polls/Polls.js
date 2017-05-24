import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import PollsList from '../../containers/polls/PollsList.js';
import Users from '../../../api/users/users';

export default class Polls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Polls">
        <Row>
          <Col xs={ 12 }>
            <div className="page-header clearfix">
              <h4 className="pull-left">Votações</h4>
              <Link to="/polls/new">
                <Button className={ Users.isNotLoggedUserAdmin() ? 'hidden' : 'pull-right'}
                        bsStyle="success">Nova Votação</Button>
              </Link>
            </div>
            <PollsList />
          </Col>
        </Row>
      </div>
    );
  }
}
