import React from 'react';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleResetPassword from '../../../modules/reset-password';

export default class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({ component: this, token: this.props.params.token });
    setTimeout(() => { document.querySelector('[name="newPassword"]').focus(); }, 0);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } mdOffset={ 3 }>
            <h3 className="page-header text-center">Redefinir Senha</h3>
            <Alert bsStyle="info">
              Redefina sua senha informando uma nova abaixo.
            </Alert>
            <form ref={ form => (this.resetPasswordForm = form) }
              className="reset-password"
              onSubmit={ this.handleSubmit }>
              <FormGroup>
                <ControlLabel>Nova Senha</ControlLabel>
                <FormControl
                  type="password"
                  ref="newPassword"
                  name="newPassword"
                  placeholder="Nova senha"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Repetir Nova Senha</ControlLabel>
                <FormControl
                  type="password"
                  ref="repeatNewPassword"
                  name="repeatNewPassword"
                  placeholder="Confirmar Nova Senha"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Redefinir Senha &amp; Entrar</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
