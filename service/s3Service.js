const AWS = require('aws-sdk');
const mime = require('mime-types');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_access_key,
});

const s3 = new AWS.S3();

// list objects
async function getS3FileUrlsList() {
  const bucketName = process.env.BUCKET_NAME;
  const cloudfrontPrefix = process.env.CLOUDFRONT_PREFIX;
  const bucketParams = { Bucket: bucketName };
  // const region = process.env.REGION;

  const request = s3.listObjects(bucketParams);
  const data = await request.promise();

  // cloudfront
  const baseUrl = `http://${cloudfrontPrefix}.cloudfront.net/`;
  const objectUrlList = data.Contents.map((ob) => baseUrl + ob.Key);

  // s3 bucket
  // const baseUrl = `https://${bucketName}.s3.${region}.amazonaws.com/`;
  // const objectUrlList = data.Contents.map((ob) => baseUrl + ob.Key);

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

