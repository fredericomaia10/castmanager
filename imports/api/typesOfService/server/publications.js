import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import TypesOfService from '../typesOfService';

Meteor.publish('typesOfService.list', () => TypesOfService.find({ disabled: false }));

Meteor.publish('typesOfService.listWithDisabled', () => TypesOfService.find());
