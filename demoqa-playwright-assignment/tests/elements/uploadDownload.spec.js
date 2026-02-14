const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');
const TestUtils = require('../../utils/testUtils');

import common from "../../test-data/users.json";

test.describe.configure({ mode: 'serial' });

test.describe('Upload and Download Tests', () => {
  test.beforeEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.open();
  });

 test("Testing Upload and Download section", async ({ page }) => {
    
    

    const uploadedFilePath = common.resources.fileToUpload;
    const uploadedFileName = common.resources.fileName;

    await uploadAndDownloadPage.uploadFile(page, uploadedFilePath);
    await uploadAndDownloadPage.verifyUploadedFile(page, uploadedFileName);
});
});