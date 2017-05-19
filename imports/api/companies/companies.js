import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Companies = new Mongo.Collection('companies');
export default Companies;

Companies.schema = new SimpleSchema({
  name: { type: String, label: 'Nome da empresa' },
  phone: { type: String, label: 'Telefone da empresa' },
  typeOfServiceId: { type: String, label: 'Tipo de serviço da empresa' },
  ownerId: { type: String, label: 'Id do dono da Empresa'},
});

Companies.attachSchema(Companies.schema);

Factory.define('company', Companies, {
  name: () => 'Factory Name',
  phone: () => 'Factory Phone',
});

Companies.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Companies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
