import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'lodash';
import { configureServices } from '../../../modules/server/services';

configureServices();

Accounts.onCreateUser((options, user) => {
  const profile = options.profile;
  if (profile) {
    user.profile = profile;
  }
  if (user.services && user.services.google && user.services.google.email) {
    user.email = user.services.google.email;
    if (!_.endsWith(user.email, Meteor.settings.public.company.domain)) {
      throw new Meteor.Error('500', 'Email não autorizado!');
    }
  }
  return user;
});
