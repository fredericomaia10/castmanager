/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { createSupplier } from '../../api/users/methods';
import '../validation.js';

let component;

const getUserData = () => ({
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value,
    },
  },
  company: {
    name: document.querySelector('[name="companyName"]').value,
    phone: document.querySelector('[name="phone"]').value,
    typeOfServiceId: document.querySelector('[name="serviceType"]').value,
  },
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
});

const signup = () => {
  const userData = getUserData();
  createSupplier.call(userData, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Meteor.loginWithPassword(userData.email, userData.password);
      browserHistory.push('/');
      Bert.alert('Bem-vindo!', 'success');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: { required: true },
      lastName: { required: true },
      companyName: { required: true },
      phone: { required: true },
      serviceType: { required: true },
      emailAddress: { required: true, email: true },
      password: { required: true, minlength: 6 },
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
        required: 'Informe o sobrenome.',
      },
      companyName: {
        required: 'Informe o nome da empresa.',
      },
      phone: {
        required: 'Informe o telefone.',
      },
      serviceType: {
        required: 'Informe o tipo de serviço.',
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
