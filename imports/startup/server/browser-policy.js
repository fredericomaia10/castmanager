import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll('*.s3-sa-east-1.amazonaws.com');
// BrowserPolicy.content.allowOriginForAll('*.s3.amazonaws.com');
BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
