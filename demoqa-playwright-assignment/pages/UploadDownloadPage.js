const BasePage = require('./base/BasePage');

const fs = require('fs');

class UploadDownloadPage extends BasePage {
  constructor(page) {
    super(page);
    
    

    this.downloadButton = '#downloadButton';
    this.uploadInput = '#uploadFile';
    this.uploadedFilePath = '#uploadedFilePath';
  }

  async open() {
    await this.navigate('https://demoqa.com/upload-download');
    
  }

    async clickDownloadButton() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.click(this.downloadButton)
    ]);
    return download;
  }

  async getDownloadPath() {
    const download = await this.clickDownloadButton();
    const path = await download.path();
    return path;
  }

  async uploadFile(filePath) {
    // Use the page helper to set input files (uploadInput is a selector string)
    await this.page.setInputFiles(this.uploadInput, filePath);
  }

  async getUploadedFilePath() {
    return await this.getText(this.uploadedFilePath);
  }

  async verifyFileUploaded(fileName) {
    const uploadedPath = await this.getUploadedFilePath();
    return uploadedPath.includes(fileName);
  }

}

module.exports = UploadDownloadPage;