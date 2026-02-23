const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('File Upload and Download Tests', () => {
  test.beforeEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.open();
  });

  test('Download file', async ({ uploadDownloadPage }) => {
    const downloadPath = await uploadDownloadPage.getDownloadPath();
    expect(downloadPath).toBeTruthy();
  });

  test('Upload file', async ({ uploadDownloadPage }) => {
    const testFilePath = './demoqa-playwright-assignment/test-data/sample.txt';
    await uploadDownloadPage.uploadFile(testFilePath);
    const verified = await uploadDownloadPage.verifyFileUploaded('sample');
    expect(verified).toBeTruthy();
  });
});