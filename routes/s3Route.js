const express = require('express');
const router = express.Router();
const { getS3FileUrlsList, uploadFileToS3 } = require('../service/s3Service');

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
