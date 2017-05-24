import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Index from '../pages/Index';
import Loading from '../components/Loading.js';
import { isLogged } from '../../modules/meteor-utils';

const composer = ({ params }, onData) => {
  const companyName = Meteor.settings.public.company;
  onData(null, { isLogged: isLogged(), companyName });
};

export default composeWithTracker(composer, Loading)(Index);
