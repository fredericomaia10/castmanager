import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';
import { insertCompany } from '../companies/methods';
import rateLimit from '../../modules/rate-limit.js';

export const createSupplier = new ValidatedMethod({
  name: 'users.createSupplier',
  validate: new SimpleSchema({
    email: { type: String, optional: true },
    password: { type: String, optional: true },
    'profile.name.first': { type: String, optional: true },
    'profile.name.last': { type: String, optional: true },
    'company.name': { type: String, optional: true },
    'company.phone': { type: String, optional: true },
    'company.typeOfServiceId': { type: String, optional: true },
  }).validator(),
  run(userData) {
    const roles = ['supplier'];
    _.extend(userData, {
      companyId: null,
      disabled: false,
      email: userData.email,
      roles,
    });
    const userId = Accounts.createUser(userData);
    const company = {
      name: userData.company.name,
      phone: userData.company.phone,
      typeOfServiceId: userData.company.typeOfServiceId,
      ownerId: userId,
    };
    try {
      if (Meteor.isServer) {
        Roles.addUsersToRoles(userId, roles);
      }
      const companyId = insertCompany.call(company);
      Meteor.users.update({ _id: userId }, { $set: { companyId } });
    } catch (e) {
      Meteor.users.remove(userId);
      const error = e.sanitizedError;
      throw new Meteor.Error(error.error, error.reason, error.details);
    }
  },
});

export const disableAccount = new ValidatedMethod({
  name: 'users.disableAccount',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    password: { type: String, optional: true },
  }).validator(),
  run({ _id, password }) {
    if (!Meteor.isServer) {
      return false;
    }
    const user = Meteor.users.findOne(_id);
    const result = Accounts._checkPassword(user, password);
    if (result.error) {
      throw new Meteor.Error('500', result.error.reason);
    } else {
      return Meteor.users.update({ _id }, { $set: { disabled: true } });
    }
  },
});

rateLimit({
  methods: [createSupplier, disableAccount],
  limit: 5,
  timeRange: 1000,
});
