import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

AWS.config = new AWS.Config();

AWS.config.accessKeyId = Meteor.settings.AWSAccessKeyId;
AWS.config.secretAccessKey = Meteor.settings.AWSSecretAccessKey;

const awsS3 = new AWS.S3();

const S3 = {
  deleteFile(file, callback) {
    const sanitizedEmailAddress = encodeURIComponent(file.emailAddress);
    const sanitizedFileName = s3PublicUrl(file.fileName);
    const sanitizedUrl = file.url.replace(sanitizedEmailAddress, file.emailAddress)
      .replace(sanitizedFileName, file.fileName);
    const bucket = Meteor.settings.AWSBucket;
    const region = Meteor.settings.AWSRegion;
    awsS3.deleteObject({
      Bucket: bucket,
      Key: sanitizedUrl.replace(`https://${bucket}.${region}.amazonaws.com/`, ''),
    }, Meteor.bindEnvironment((error) => {
      if (error) console.warn(error);
      if (!error && callback) callback(file.url);
    }));
  },
};

export default S3;
