const express = require('express');
require('dotenv/config');
const morgan = require('morgan');
const { s3OpsRoute } = require('./routes/s3Route');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

// middleware
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(morgan('dev'));

// routes
app.use(`/s3/objects/list`, s3OpsRoute);

app.use(`/s3/objects/upload`, s3OpsRoute);

app.listen(4000, () => {
  console.log('server is running');
});
