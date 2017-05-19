import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'lodash';
import { configureServices } from '../../../modules/server/services';

configureServices();

Accounts.onCreateUser((options, createdUser) => {
  const profile = options.profile;
  const user = createdUser;
  if (profile) {
    user.profile = profile;
  }
  const hasGoogleEmailService = user.services && user.services.google
    && user.services.google.email;
  const domain = Meteor.settings.public.domain;
  if (hasGoogleEmailService) {
    user.email = user.services.google.email;
    if (domain && !_.endsWith(user.email, domain)) {
      throw new Meteor.Error('500', 'Email não autorizado!');
    }
  }
  return user;
});
