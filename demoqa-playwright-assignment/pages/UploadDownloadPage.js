const BasePage = require('./base/BasePage');
const path = require('path');
const fs = require('fs');

class UploadDownloadPage extends BasePage {
  constructor(page) {
    super(page);
    
    

    this.uploadFileInput = "#uploadFile";
    this.uploadedFilePathDisplay = "#uploadedFilePath";
  }

  async open() {
    await this.navigate('https://demoqa.com/upload-download');
    //await this.closeAds();
  }

  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.click(this.downloadButton)
    ]);
    
    const filePath = await download.path();
    const suggestedFilename = download.suggestedFilename();
    
    return {
      download,
      filePath,
      suggestedFilename
    };
  }
  async uploadFile(page, filePath) {
        await page.locator(this.uploadFileInput).setInputFiles(filePath);
    }

    async verifyUploadedFile(page, expectedFileName) {
        await expect(page.locator(this.uploadedFilePathDisplay)).toContainText(expectedFileName);
    }

}

module.exports = UploadDownloadPage;