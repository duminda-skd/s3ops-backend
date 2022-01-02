const express = require('express');
const s3OpsRoute = express.Router();
const { getS3FileUrlsList, uploadFileToS3 } = require('../service/s3Service');

s3OpsRoute.get('/', async (req, res) => {
  const objectUrlList = await getS3FileUrlsList();
  res.send(objectUrlList);
});

s3OpsRoute.post('/', async (req, res) => {
  if (!req.files) {
    res.status(401).send('No file uploaded');
  }

  const uploadedFile = req.files.upload;
  const uploadedFileUrl = await uploadFileToS3({ uploadedFile });

  //send response
  res.send(`successfully uploaded. url: ${uploadedFileUrl}`);
});

module.exports = { s3OpsRoute };
