import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import TypesOfServiceItems from '../../components/typesOfService/TypesOfServiceItems';
import handleSignup from '../../../modules/login/signup-supplier';

class SignupSupplier extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
    setTimeout(() => { document.querySelector('[name="companyName"]').focus(); }, 0);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const typesOfService = this.props.typesOfService;
    return (
      <div className="SignupSupplier">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } mdOffset={ 3 }>
            <h3 className="text-center">Torne-se um fornecedor da Meus Eventos</h3>
            <form ref={ form => (this.signupForm = form) }
              onSubmit={ this.handleSubmit } >
              <h4 className="page-header">Dados da Empresa</h4>
              <FormGroup>
                <ControlLabel>Nome da Empresa</ControlLabel>
                <FormControl type="text" ref="companyName"
                             name="companyName" placeholder="Nome da Empresa" />
              </FormGroup>
              <Row>
                <Col xs={ 5 } sm={ 5 }>
                  <FormGroup>
                    <ControlLabel>Telefone de Contato</ControlLabel>
                    <FormControl type="text" ref="phone"
                                 name="phone" placeholder="(xx) xxxxx-xxxx" />
                  </FormGroup>
                </Col>
                <Col xs={ 7 } sm={ 7 }>
                  <FormGroup>
                    <ControlLabel>Tipo de Serviço Oferecido</ControlLabel>
                    <TypesOfServiceItems typesOfService={ typesOfService } />
                  </FormGroup>
                </Col>
              </Row>
              <h4 className="page-header">Dados Pessoais</h4>
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
                    <FormControl type="text" ref="lastName" name="lastName"
                                 placeholder="Sobrenome" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="email" ref="emailAddress"
                             name="emailAddress" placeholder="Informe seu Email" />
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
              <Row className="actions">
                <Button type="submit" bsStyle="success">Cadastrar</Button>
              </Row>
            </form>
            <p>Já possui uma conta? <Link to="/login">Entrar</Link>.</p>
          </Col>
        </Row>
      </div>
    );
  }
}

SignupSupplier.propTypes = {
  typesOfService: React.PropTypes.array,
};

export default SignupSupplier;
