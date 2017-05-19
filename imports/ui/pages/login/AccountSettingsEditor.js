/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import accountSettingsEditor from '../../../modules/login/account-settings-editor';
import accountSettingsDisable from '../../../modules/login/account-settings-disable';

export default class AccountSettingsEditor extends React.Component {
  componentDidMount() {
    accountSettingsEditor({ component: this });
    accountSettingsDisable({ component: this });
  }

  render() {
    return (
      <div className="AccountSettingsEditor">
        <h3 className="text-center">Minhas Configurações</h3>
        <Col sm={ 12 } md={ 6 } mdOffset={ 3 }>
          <form ref={ form => (this.accountSettingsEditorForm = form) }
            onSubmit={ event => event.preventDefault() }>
          <h4 className="page-header">Definir Nova Senha</h4>
          <Row>
            <Col sm={ 12 } md={ 6 }>
              <FormGroup>
                <ControlLabel>Senha Atual</ControlLabel>
                <FormControl type="password" name="oldPassword" placeholder="Senha Atual" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={ 12 } md={ 6 }>
              <FormGroup>
                <ControlLabel>Nova Senha</ControlLabel>
                <FormControl type="password" name="newPassword" placeholder="Nova Senha" />
              </FormGroup>
            </Col>
            <Col sm={ 12 } md={ 6 }>
              <FormGroup>
                <ControlLabel>Confirmar Nova Senha</ControlLabel>
                <FormControl type="password" name="confirmNewPassword" placeholder="Confirmar Nova Senha" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="actions">
            <Button type="submit" bsStyle="success">Salvar alterações</Button>
          </Row>
        </form>
        <form ref={ form => (this.accountSettingsDisableForm = form) }
              onSubmit={ event => event.preventDefault() }>
          <h4 className="page-header">Desativar Conta</h4>
          <FormGroup>
            Ao desativar sua conta, seus dados não serão mais apresentados. Tenha certeza ao realizar esta ação. Posteriormente, você poderá reativar sua conta.
          </FormGroup>
          <FormGroup>
            <ControlLabel>Senha Atual</ControlLabel>
            <FormControl type="password" name="password" placeholder="Senha Atual" />
          </FormGroup>
          <Row className="actions">
            <Button type="submit" bsStyle="danger">Desativar conta</Button>
          </Row>
        </form>
      </Col>
    </div>);
  }
}

AccountSettingsEditor.propTypes = {
  user: React.PropTypes.object,
};
