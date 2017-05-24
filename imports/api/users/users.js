import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';

const Users = Meteor.users;

_.extend(Users, {
  findById(userId) {
    return this.find({ _id: userId }, { fields: { email: 1, disabled: 1, name: 1, language: 1 } });
  },
  isNotAdmin(userId) {
    return !Users.isAdmin(userId);
  },
  isAdmin(userId) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  isNotLoggedUserAdmin() {
    return !this.isLoggedUserAdmin();
  },
  isLoggedUserAdmin() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
});

export default Users;
