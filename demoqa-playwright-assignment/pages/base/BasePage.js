class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async waitForTimeout(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async clearAndFill(selector, text) {
    await this.page.fill(selector, '');
    await this.page.fill(selector, text);
  }

   async clearTextBox(selector) {
    await this.page.fill(selector, '');
    //await this.page.fill(selector, text);
  }

  async selectDropdown(selector, value) {
    await this.page.selectOption(selector, value);
  }

  async uploadFile(selector, filePath) {
    await this.page.setInputFiles(selector, filePath);
  }

  async getAttributeValue(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  async hover(selector) {
    await this.page.hover(selector);
  }

  async doubleClick(selector) {
    await this.page.dblclick(selector);
  }

  async rightClick(selector) {
    await this.page.click(selector, { button: 'right' });
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  async dragAndDrop(sourceSelector, targetSelector) {
    await this.page.dragAndDrop(sourceSelector, targetSelector);
  }

  async switchToFrame(frameSelector) {
    const frame = this.page.frameLocator(frameSelector);
    return frame;
  }

  async handleAlert(action = 'accept', promptText = '') {
    this.page.on('dialog', async dialog => {
      if (action === 'accept') {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
  }

  async getAlertText() {
    let alertText = '';
    this.page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });
    return alertText;
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async waitForLoadState(state = 'load') {
    await this.page.waitForLoadState(state);
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

  async closeAds() {
    try {
      const adSelectors = [
        '#close-fixedban',
        '.ad-close-button',
        '[id*="google_ads"]'
      ];
      
      for (const selector of adSelectors) {
        const adElement = this.page.locator(selector);
        if (await adElement.isVisible({ timeout: 2000 }).catch(() => false)) {
          await adElement.click();
        }
      }
    } catch (error) {
      // Ads not present, continue
    }
  }
}

module.exports = BasePage;