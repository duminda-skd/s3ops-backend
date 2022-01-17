const { getS3FileUrlsList } = require('./s3Service');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

jest.setTimeout(30000);

describe('testing s3 file-url testing', () => {
  test('checking if service call fetches objects', async () => {
    const objectUrls = await getS3FileUrlsList();
    expect(objectUrls.length).toBeGreaterThan(0);
  });
});
