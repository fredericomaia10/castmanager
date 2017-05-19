/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { disableAccount } from '../../api/users/methods.js';
import '../validation.js';

let component;

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

const handleDisable = () => {
  const { user } = component.props;
  const userData = {
    _id: user._id,
    password: document.querySelector('[name="password"]').value.trim(),
  };
  disableAccount.call(userData, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      handleLogout();
      Bert.alert('Conta desativada. Esperamos que volte. :(', 'success');
    }
  });
};

const validate = () => {
  $(component.accountSettingsDisableForm).validate({
    rules: {
      password: {
        required: true,
      },
    },
    messages: {
      password: {
        required: 'Informe sua senha.',
      },
    },
    submitHandler() {
      // TODO verificar se está errado este confirm aqui
      if (confirm('Não nos deixe! Quer mesmo desativar sua conta?')) {
        handleDisable();
      }
    },
  });
};

export default function accountSettingsDisable(options) {
  component = options.component;
  validate();
}
