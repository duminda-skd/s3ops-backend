const express = require('express');
require('dotenv/config');
const morgan = require('morgan');
const router = require('./routes/s3Route');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// middleware
app.use(cors());
app.options('*', cors());  // enable pre-flight
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(morgan('dev'));

// routes
app.use(`/s3/objects`, router);

app.listen(4000, () => {
  console.log('server is running!!');
});
