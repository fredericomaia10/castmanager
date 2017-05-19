import { Meteor } from 'meteor/meteor';

const services = Meteor.settings.private.oAuth;

export const configureServices = () => {
  if (services) {
    for (const service in services) {
      ServiceConfiguration.configurations.upsert(
        { service },
        {
          $set: services[service],
        }
      );
    }
  }
};
