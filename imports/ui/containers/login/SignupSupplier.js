import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import TypesOfService from '../../../api/typesOfService/typesOfService.js';
import SignupSupplier from '../../pages/login/SignupSupplier.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('typesOfService.list');
  if (subscription.ready()) {
    const typesOfService = TypesOfService.findOrderBy('name').fetch();
    onData(null, { typesOfService });
  }
};

export default composeWithTracker(composer, Loading)(SignupSupplier);
