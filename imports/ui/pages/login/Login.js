import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../../../modules/login';

export default class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleLogin(e) {
    e.preventDefault();
    const options = {
      requestPermissions: ['email'],
    };
    Meteor['loginWithGoogle'](options, (error) => {
      if (error) {
        Bert.alert(error.message, 'danger');
      } else {
        Bert.alert('Bem-vindo!', 'success');
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } mdOffset={3} className="text-center">
            <h3 className="page-header text-center">
              Entrar no <span style={ { fontWeight: 'bold' } }>cast</span>manager
            </h3>
            <p>Acesso autorizado para colaboradores da empresa Tecsinapse.</p>
            <Button data-social-login="loginWithGoogle" onClick={ e => this.handleLogin(e) }>
              <i className="fa fa-google"></i> Entrar com Google
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
