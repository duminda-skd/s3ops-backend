const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: 'AKIAUNMMLSRQEIOB7XWP',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

// list objects
async function getS3FileUrlsList() {
  const bucketName = process.env.BUCKET_NAME;
  const bucketParams = { Bucket: bucketName };
  const region = process.env.REGION;

  const request = s3.listObjects(bucketParams);
  const data = await request.promise();

  const baseUrl = `https://${bucketName}.s3.${region}.amazonaws.com/`;
  const objectUrlList = data.Contents.map((ob) => baseUrl + ob.Key);

  return objectUrlList;
}

// upload
async function uploadFileToS3(args) {
  const { uploadedFile } = args;

  const params = {
    Bucket: 's3-cc-demo',
    Body: uploadedFile.data,
    Key: uploadedFile.name,
    ContentType: mime.lookup(uploadedFile.name),
  };

  const request = s3.upload(params);
  const data = await request.promise();

  return data.Location;
}

module.exports = { getS3FileUrlsList, uploadFileToS3 };
