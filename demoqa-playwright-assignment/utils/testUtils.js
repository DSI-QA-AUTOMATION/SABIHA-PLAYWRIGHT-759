const fs = require('fs');
const path = require('path');

class TestUtils {
  static loadTestData(fileName) {
    const filePath = path.join(process.cwd(), 'demoqa-playwright-assignment/test-data', fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }



  static formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  static async takeScreenshot(page, name) {
    const screenshotPath = path.join(process.cwd(), 'reports', 'screenshots', `${name}-${Date.now()}.png`);
    const dir = path.dirname(screenshotPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    await page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  static async createSampleFile(fileName, content = 'Sample test file') {
    const filePath = path.join(process.cwd(), 'demoqa-playwright-assignment/test-data', fileName);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  static async deleteSampleFile(fileName) {
    const filePath = path.join(process.cwd(), 'demoqa-playwright-assignment/test-data', fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static async clearDownloads() {
    const downloadsPath = path.join(process.cwd(), 'downloads');
    if (fs.existsSync(downloadsPath)) {
      const files = fs.readdirSync(downloadsPath);
      files.forEach(file => {
        fs.unlinkSync(path.join(downloadsPath, file));
      });
    }
  }

  static sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static getCurrentTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}

module.exports = TestUtils;