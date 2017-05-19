/* eslint-disable consistent-return, object-shorthand */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const MetaSchema = new SimpleSchema({
  userId: {
    type: String,
    autoValue: function () {
      if (this.userId) {
        if (this.isInsert) {
          return this.userId;
        } else if (this.isUpsert) {
          return { $setOnInsert: this.userId };
        }
        this.unset();
      }
    },
  },
  lastUpdatedUserId: {
    type: String,
    autoValue: function () {
      if (this.userId) {
        return this.userId;
      }
    },
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset();
    },
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
  },
});

export default MetaSchema;
