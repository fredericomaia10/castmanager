import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import handleRecoverPassword from '../../../modules/recover-password';

export default class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
    setTimeout(() => { document.querySelector('[name="emailAddress"]').focus(); }, 0);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="RecoverPassword">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } mdOffset={ 3 }>
            <h3 className="page-header text-center">Recuperar Senha</h3>
            <Alert bsStyle="info">
              Informe seu email para receber um link de redefinição de senha.
            </Alert>
            <form ref={ form => (this.recoverPasswordForm = form) }
              className="recover-password" onSubmit={ this.handleSubmit }>
              <FormGroup>
                <FormControl type="email" ref="emailAddress"
                  name="emailAddress" placeholder="Email de cadastro" />
              </FormGroup>
              <Button type="submit" bsStyle="success">Recuperar Senha</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}
