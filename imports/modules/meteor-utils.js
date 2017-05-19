import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export const loggedUserId = () => Meteor.userId();

export const isLogged = () => !!Meteor.userId();

export const handleError = (error) => {
  if (error) {
    console.log(error);
    Bert.alert(error.reason, 'danger');
  }
};

export const throwException = (message = 'Erro inesperado!', code = '500') => {
  throw new Meteor.Error(code, message);
};
