import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import TypesOfService from '../typesOfService/typesOfService';
import rateLimit from '../../modules/rate-limit.js';

export const insertTypesOfService = new ValidatedMethod({
  name: 'typesOfService.insert',
  validate: new SimpleSchema({
    name: { type: String, optional: true },
    active: { type: Boolean, optional: true },
  }).validator(),
  run(typesOfService) {
    return TypesOfService.insert(typesOfService);
  },
});

rateLimit({
  methods: [insertTypesOfService],
  limit: 5,
  timeRange: 1000,
});
