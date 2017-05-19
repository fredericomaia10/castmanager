import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Files = new Mongo.Collection('files');
export default Files;

Files.schema = new SimpleSchema({
  url: { type: String, label: 'URL do arquivo.' },
  userId: { type: String, label: 'Id do Usuário.' },
  added: { type: Date, label: 'Data adicionado.' },
});

Files.attachSchema(Files.schema);

Files.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Files.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
