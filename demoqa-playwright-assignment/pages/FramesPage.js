const BasePage = require('./base/BasePage');

class FramesPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.frame1 = '#frame1';
    this.frame2 = '#frame2';
    this.frameHeading = '#sampleHeading';
  }

  async open() {
    await this.navigate('https://demoqa.com/frames');
    //await this.closeAds();
  }

  async getFrame1Text() {
    const frame = this.page.frameLocator(this.frame1);
    const heading = frame.locator(this.frameHeading);
    return await heading.textContent();
  }

  async getFrame2Text() {
    const frame = this.page.frameLocator(this.frame2);
    const heading = frame.locator(this.frameHeading);
    return await heading.textContent();
  }

  async verifyFrame1Content(expectedText) {
    const text = await this.getFrame1Text();
    return text === expectedText;
  }

  async verifyFrame2Content(expectedText) {
    const text = await this.getFrame2Text();
    return text === expectedText;
  }

  async isFrame1Visible() {
    return await this.isVisible(this.frame1);
  }

  async isFrame2Visible() {
    return await this.isVisible(this.frame2);
  }

  async getFrameDimensions(frameSelector) {
    const frame = await this.page.locator(frameSelector);
    const box = await frame.boundingBox();
    return {
      width: box.width,
      height: box.height
    };
  }

  async getFrame1Dimensions() {
    return await this.getFrameDimensions(this.frame1);
  }

  async getFrame2Dimensions() {
    return await this.getFrameDimensions(this.frame2);
  }
}

module.exports = FramesPage;