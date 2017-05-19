import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Companies from '../companies/companies';
import rateLimit from '../../modules/rate-limit.js';

export const insertCompany = new ValidatedMethod({
  name: 'companies.insert',
  validate: new SimpleSchema({
    name: { type: String, optional: true },
    phone: { type: String, optional: true },
    typeOfServiceId: { type: String, optional: true },
    ownerId: { type: String, optional: true },
  }).validator(),
  run(company) {
    return Companies.insert(company);
  },
});

export const updateProposal = new ValidatedMethod({
  name: 'companies.update',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    name: { type: String, optional: true },
    phone: { type: String, optional: true },
    typeOfServiceId: { type: String, optional: true },
  }).validator(),
  run(company) {
    return Companies.update({ _id: company._id }, { $set: company });
  },
});

rateLimit({
  methods: [insertCompany, updateProposal],
  limit: 5,
  timeRange: 1000,
});
