import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import AccountSettingsEditor from '../../pages/login/AccountSettingsEditor.js';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('users.account.settings');

  if (subscription.ready()) {
    const user = Meteor.users.findOne(Meteor.userId());
    onData(null, { user });
  }
};

export default composeWithTracker(composer, Loading)(AccountSettingsEditor);
