/* eslint-disable no-undef */

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';
import './validation.js';

let component;

const handleRecovery = () => {
  const sendButton = document.querySelector('[type="submit"]');
  sendButton.innerText = 'Enviando email...';
  sendButton.setAttribute('disabled', 'disabled');
  Accounts.forgotPassword({
    email: document.querySelector('[name="emailAddress"]').value,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      browserHistory.push('/login');
      Bert.alert('Verifique o link enviado para o seu email!', 'success');
    }
    sendButton.innerText = 'Recuperar Senha';
    sendButton.removeAttribute('disabled');
  });
};

const validate = () => {
  $(component.recoverPasswordForm).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Informe o email.',
        email: 'Informe um email válido',
      },
    },
    submitHandler() { handleRecovery(); },
  });
};

export default function handleRecoverPassword(options) {
  component = options.component;
  validate();
}
