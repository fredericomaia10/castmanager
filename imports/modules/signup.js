/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value,
    },
  },
});

const signup = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Bem-vindo!', 'success');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
      confirmPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="password"]',
      },
    },
    messages: {
      firstName: {
        required: 'Informe o primeiro nome.',
      },
      lastName: {
        required: 'Informe o último nome.',
      },
      emailAddress: {
        required: 'Informe o email.',
        email: 'Informe um email válido.',
      },
      password: {
        required: 'Informe uma senha.',
        minlength: 'Use ao menos 6 caracteres.',
      },
      confirmPassword: {
        required: 'Informe a confirmação de senha.',
        minlength: 'Use ao menos 6 caracteres.',
        equalTo: 'Confirmação de senha não confere.',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
