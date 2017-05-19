import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Companies from '../companies';
import TypesOfService from '../../typesOfService/typesOfService';
import Files from '../../files/files';

Meteor.publish('companies.list', () => Companies.find());

Meteor.publish('companies.view', (_id) => {
  check(_id, String);
  return Companies.find(_id);
});

Meteor.publish('companies.viewByOwner', (ownerId) => {
  check(ownerId, String);
  return [
    Companies.find({ ownerId }),
    TypesOfService.find({ disabled: false }),
    Meteor.users.find({ _id: ownerId }),
    Files.find({ userId: ownerId }),
  ];
});
