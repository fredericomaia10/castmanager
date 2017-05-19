import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

Slingshot.fileRestrictions('uploadToAmazonS3', {
  allowedFileTypes: ['image/png','image/jpeg'],
  maxSize: 1 * 1024 * 1024,
});

Slingshot.createDirective('uploadToAmazonS3', Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSBucket,
  region: Meteor.settings.AWSRegion,
  acl: 'public-read',
  authorize() {
    if (!this.userId) {
      const message = 'Por favor, entre com seu login.';
      throw new Meteor.Error('Login obrigatório', message);
    }
    return true;
  },
  key(file) {
    const user = Meteor.users.findOne(this.userId);
    return `${user.emails[0].address}/${file.name}-${Random.id()}`;
  },
});
