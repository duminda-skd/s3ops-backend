const express = require('express');
const router = express.Router();
const { getS3FileUrlsList, uploadFileToS3 } = require('../service/s3Service');

router.get('/check_keys', async (req, res) => {
  console.log('process.env.access_key_id :>> ', process.env.access_key_id);
  console.log(
    'process.env.secret_access_key :>> ',
    process.env.secret_access_key
  );
  console.log('process.env.BUCKET_NAME :>> ', process.env.BUCKET_NAME);
  res.status(200).send('');
});

router.get('/list', async (req, res) => {
  const objectUrlList = await getS3FileUrlsList();
  res.send(objectUrlList);
});

router.post('/upload', async (req, res) => {
  if (!req.files) {
    res.status(401).send('No file uploaded');
  }

  const uploadedFile = req.files.upload;
  const uploadedFileUrl = await uploadFileToS3({ uploadedFile });

  //send response
  res.send(`successfully uploaded. url: ${uploadedFileUrl}`);
});

module.exports = router;
