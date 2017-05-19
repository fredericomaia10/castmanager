/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import TypesOfServiceItems from '../typesOfService/TypesOfServiceItems';
import Uploader from '../Uploader';
import LogoImage from '../LogoImage';
import companyEditor from '../../../modules/companies/company-editor';

export default class CompanyEditor extends React.Component {
  componentDidMount() {
    companyEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
  }

  render() {
    const { company } = this.props;
    const { typesOfService } = this.props;
    const { owner } = this.props;
    const { logoFile } = this.props;
    const email = owner.emails[0].address;
    return (
      <div className="CompanyEditor">
        <h3 className="text-center">Meus dados de fornecedor</h3>
        <Col xs={ 12 } sm={ 6 } md={ 6 } mdOffset={ 3 }>
          <form ref={ form => (this.proposalEditorForm = form) }
            onSubmit={ event => event.preventDefault() }>
          <h4 className="page-header">Dados de Empresa</h4>
          <FormGroup>
            <ControlLabel>Logo da Empresa</ControlLabel>
            <LogoImage url={ logoFile ? logoFile.url : ''} />
            <Uploader />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nome da Empresa</ControlLabel>
            <FormControl type="text" name="name"
              defaultValue={ company && company.name } placeholder="Nome da Empresa" />
          </FormGroup>
          <Row>
            <Col xs={ 5 } sm={ 5 }>
              <FormGroup>
                <ControlLabel>Telefone de Contato</ControlLabel>
                <FormControl type="text" name="phone"
                             placeholder="(xx) xxxxx-xxxx"
                             defaultValue={ company && company.phone } />
              </FormGroup>
            </Col>
            <Col xs={ 7 } sm={ 7 }>
              <FormGroup>
                <ControlLabel>Tipo de Serviço Oferecido</ControlLabel>
                <TypesOfServiceItems typesOfService={ typesOfService } idSelected={ company.typeOfServiceId } />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <ControlLabel>Descrição da Empresa</ControlLabel>
            <FormControl componentClass="textarea" name="companyDescription"
                         defaultValue={ company && company.description }
                         placeholder="Descrição da Empresa" />
          </FormGroup>
          <h4 className="page-header">Endereço da Empresa</h4>
          <Row>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>CEP</ControlLabel>
                <FormControl type="text" name="cep"
                             placeholder="CEP" />
              </FormGroup>
            </Col>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>Estado</ControlLabel>
                <FormControl type="text" name="estado"
                             placeholder="Estado" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>Cidade</ControlLabel>
                <FormControl type="text" name="cidade"
                             placeholder="Cidade" />
              </FormGroup>
            </Col>
            <Col xs={ 6 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>Bairro</ControlLabel>
                <FormControl type="text" name="bairro"
                             placeholder="Bairro" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <ControlLabel>Logradouro</ControlLabel>
            <FormControl type="text" name="logradouro"
                         placeholder="Logradouro" />
          </FormGroup>
          <Row>
            <Col xs={ 4 } sm={ 4 }>
              <FormGroup>
                <ControlLabel>Número</ControlLabel>
                <FormControl type="text" name="numero"
                             placeholder="Número" />
              </FormGroup>
            </Col>
            <Col xs={ 8 } sm={ 8 }>
              <FormGroup>
                <ControlLabel>Complemento</ControlLabel>
                <FormControl type="text" name="complemento"
                             placeholder="Complemento" />
              </FormGroup>
            </Col>
          </Row>
          <h4 className="page-header">Dados Pessoais</h4>
          <Row>
            <Col xs={ 5 } sm={ 5 }>
              <FormGroup>
                <ControlLabel>Nome</ControlLabel>
                <FormControl type="text" ref="firstName"
                             defaultValue={ owner && owner.profile && owner.profile.name.first }
                             name="firstName" placeholder="Primeiro Nome" />
              </FormGroup>
            </Col>
            <Col xs={ 7 } sm={ 7 }>
              <FormGroup>
                <ControlLabel>Sobrenome</ControlLabel>
                <FormControl type="text" ref="lastName"
                             defaultValue={ owner && owner.profile && owner.profile.name.last }
                             name="lastName" placeholder="Sobrenome" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={ 5 } sm={ 5 }>
              <FormGroup>
                <ControlLabel>Celular</ControlLabel>
                <FormControl type="text" name="celular"
                             placeholder="Celular" />
              </FormGroup>
            </Col>
            <Col xs={ 7 } sm={ 7 }>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" name="email"
                             defaultValue={ email } disabled="disabled" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="actions">
            <Button type="submit" bsStyle="success">Salvar alterações</Button>
          </Row>
        </form>
      </Col>
    </div>);
  }
}

CompanyEditor.propTypes = {
  company: React.PropTypes.object,
  typesOfService: React.PropTypes.array,
  owner: React.PropTypes.object,
  logoFile: React.PropTypes.object,
};
