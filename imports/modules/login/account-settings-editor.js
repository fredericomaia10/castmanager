/* eslint-disable no-undef */

import { Bert } from 'meteor/themeteorchef:bert';
import '../validation.js';

let component;

const handleUpdatePassword = () => {
  const userData = {
    oldPassword: document.querySelector('[name="oldPassword"]').value.trim(),
    newPassword: document.querySelector('[name="newPassword"]').value.trim(),
  };
  Accounts.changePassword(userData.oldPassword, userData.newPassword, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      document.querySelector('[name="oldPassword"]').value = '';
      document.querySelector('[name="newPassword"]').value = '';
      document.querySelector('[name="confirmNewPassword"]').value = '';
      Bert.alert('Dados alterados!', 'success');
    }
  });
};

const validate = () => {
  $(component.accountSettingsEditorForm).validate({
    rules: {
      oldPassword: {
        required: true,
      },
      newPassword: {
        required: true,
        minlength: 6,
      },
      confirmNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]',
      },
    },
    messages: {
      oldPassword: {
        required: 'Informe sua senha.',
      },
      newPassword: {
        required: 'Informe uma nova senha.',
        minlength: 'Use ao menos 6 caracteres.',
      },
      confirmNewPassword: {
        required: 'Informe a confirmação da nova senha.',
        minlength: 'Use ao menos 6 caracteres.',
        equalTo: 'Confirmação de senha não confere.',
      },
    },
    submitHandler() { handleUpdatePassword(); },
  });
};

export default function accountSettingsEditor(options) {
  component = options.component;
  validate();
}
