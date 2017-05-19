import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import s3PublicUrl from 'node-s3-public-url';
import AWS from 'aws-sdk';
import Files from './files';
import rateLimit from '../../modules/rate-limit.js';

export const storeUrlInDatabase = new ValidatedMethod({
  name: 'files.storeUrl',
  validate: new SimpleSchema({
    url: { type: String, optional: true },
  }).validator(),
  run({ url }) {
    return Files.insert({
      url,
      userId: Meteor.userId(),
      added: new Date(),
    });
  },
});

AWS.config.update({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});

const awsS3 = new AWS.S3();

const deleteS3File = (file, callback) => {
  const sanitizedEmailAddress = encodeURIComponent(file.emailAddress);
  const sanitizedFileName = s3PublicUrl(file.fileName);
  const sanitizedUrl = file.url.replace(sanitizedEmailAddress, file.emailAddress)
    .replace(sanitizedFileName, file.fileName);
  const bucket = Meteor.settings.AWSBucket;
  const region = Meteor.settings.AWSRegion;
  const params = {
    Bucket: bucket,
    Key: sanitizedUrl.replace(`https://${bucket}.${region}.amazonaws.com/`, ''),
  };
  awsS3.deleteObject(params, Meteor.bindEnvironment((error) => {
    if (error) console.warn(error);
    if (!error && callback) callback(file.url);
  }));
};

export const deleteFile = new ValidatedMethod({
  name: 'files.delete',
  validate: new SimpleSchema({
    url: { type: String, optional: true },
  }).validator(),
  run({ url }) {
    const file = Files.findOne({ url });
    const user = Meteor.users.findOne(this.userId, { fields: { emails: 1 } });
    file.emailAddress = user.emails[0].address;
    if (file && file.userId === this.userId) {
      return deleteS3File(file, () => {
        Files.remove({ _id: file._id, userId: this.userId });
      });
    }
    throw new Meteor.Error('500', 'Você deve estar logado.');
  },
});

rateLimit({
  methods: [
    storeUrlInDatabase, deleteFile,
  ],
  limit: 5,
  timeRange: 1000,
});
