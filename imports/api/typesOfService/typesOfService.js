import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const TypesOfService = new Mongo.Collection('typesOfService');
export default TypesOfService;

TypesOfService.schema = new SimpleSchema({
  name: { type: String, label: 'Tipo de Serviço' },
  disabled: { type: Boolean, label: 'Disabled' },
});

TypesOfService.attachSchema(TypesOfService.schema);

TypesOfService.findOrderBy = field => TypesOfService.find({}, { sort: { [field]: 1 } });

Factory.define('company', TypesOfService, {
  name: () => 'Factory Name',
  disabled: () => false,
});

TypesOfService.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

TypesOfService.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
