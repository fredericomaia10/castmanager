/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const login = () => {
  const email = document.querySelector('[name="emailAddress"]').value;
  const password = document.querySelector('[name="password"]').value;

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Bem-vindo!', 'success');

      const { location } = component.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

const validate = () => {
  $(component.loginForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Informe o email.',
        email: 'Informe um email válido.',
      },
      password: {
        required: 'Informe a senha.',
      },
    },
    submitHandler() { login(); },
  });
};

export default function handleLogin(options) {
  component = options.component;
  validate();
}
