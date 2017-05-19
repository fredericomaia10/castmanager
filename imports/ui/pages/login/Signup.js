import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleSignup from '../../../modules/signup';

export default class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
    setTimeout(() => { document.querySelector('[name="firstName"]').focus(); }, 0);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } mdOffset={3}>
            <h3 className="page-header text-center">Cadastre-se na Meus Eventos</h3>
            <form ref={ form => (this.signupForm = form) }
              onSubmit={ this.handleSubmit }>
              <Row>
                <Col xs={ 6 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Primeiro Nome</ControlLabel>
                    <FormControl type="text" ref="firstName"
                                 name="firstName" placeholder="Primeiro Nome" />
                  </FormGroup>
                </Col>
                <Col xs={ 6 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Sobrenome</ControlLabel>
                    <FormControl type="text" ref="lastName"
                      name="lastName" placeholder="Sobrenome" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" ref="emailAddress"
                  name="emailAddress" placeholder="Email" />
              </FormGroup>
              <Row>
                <Col xs={ 6 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Senha</ControlLabel>
                    <FormControl type="password" ref="password"
                                 name="password" placeholder="Defina uma Senha" />
                  </FormGroup>
                </Col>
                <Col xs={ 6 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Confirmar Senha</ControlLabel>
                    <FormControl type="password" ref="confirmPassword"
                                 name="confirmPassword" placeholder="Confirme a Senha" />
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" bsStyle="success">Cadastrar</Button>
            </form>
            <p>Já possui uma conta? <Link to="/login">Entrar</Link>.</p>
          </Col>
        </Row>
      </div>
    );
  }
}
