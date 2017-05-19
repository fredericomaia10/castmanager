import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory, Link } from 'react-router';
import { Jumbotron, Row, Button, Col } from 'react-bootstrap';

const handleLogin = (e) => {
  e.preventDefault();
  const options = {
    requestPermissions: ['email'],
  };
  Meteor.loginWithGoogle(options, (error) => {
    if (error) {
      Bert.alert(error.message, 'danger');
    } else {
      Bert.alert('Bem-vindo!', 'success');
      browserHistory.push('/proposals');
    }
  });
};

const Index = ({ isLogged, companyName }) => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h4 style={ { lineHeight: 0.5, marginBottom: -10, fontSize: 15 }}>{ companyName }</h4>
      <h2>
        <i className="fa fa-microphone" aria-hidden="true"></i>
        <span style={ { fontWeight: 'bold' } }> cast</span>manager
      </h2>
      <p>Gerencie e crie votações para os temas do seu podcast.</p>
      <Row className={ isLogged ? 'hide' : '' } >
        <Button data-social-login="loginWithGoogle" onClick={ e => handleLogin(e) }>
          <i className="fa fa-google"></i> Entrar com Google
        </Button>
      </Row>
      <p style={ { fontSize: '16px', color: '#aaa' } }>By F7 Labs</p>
    </Jumbotron>
    <Row className={ isLogged ? '' : 'hide' } >
      <Col xs={ 6 } className="text-center">
        <Link to="/proposals/new">
          <Button bsStyle="success" bsSize="large">Sugerir Proposta</Button>
        </Link>
      </Col>
      <Col xs={ 6 } className="text-center">
        <Link to="/polls">
          <Button bsStyle="info" bsSize="large">Ver votações</Button>
        </Link>
      </Col>
    </Row>
  </div>
);

Index.propTypes = {
  isLogged: React.PropTypes.bool,
  companyName: React.PropTypes.string,
};

export default Index;
