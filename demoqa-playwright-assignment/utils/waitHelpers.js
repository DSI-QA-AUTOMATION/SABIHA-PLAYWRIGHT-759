class WaitHelpers {
  static async waitForElement(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { timeout, state: 'visible' });
  }

  static async waitForElementToDisappear(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { timeout, state: 'hidden' });
  }

  static async waitForNavigation(page, timeout = 30000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async waitForURL(page, urlPattern, timeout = 10000) {
    await page.waitForURL(urlPattern, { timeout });
  }

  static async waitForText(page, text, timeout = 10000) {
    await page.waitForSelector(`text=${text}`, { timeout });
  }

 

  static async waitForFileDownload(page, timeout = 30000) {
    return await page.waitForEvent('download', { timeout });
  }

  static async waitForDialog(page, timeout = 5000) {
    return await page.waitForEvent('dialog', { timeout });
  }

  static async waitForResponse(page, urlPattern, timeout = 30000) {
    return await page.waitForResponse(urlPattern, { timeout });
  }

  static async waitForRequest(page, urlPattern, timeout = 30000) {
    return await page.waitForRequest(urlPattern, { timeout });
  }

  static sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static async retryAction(action, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.sleep(delay);
      }
    }
  }

  static async waitAndClick(page, selector, timeout = 10000) {
    await this.waitForElement(page, selector, timeout);
    await page.click(selector);
  }

  static async waitAndFill(page, selector, text, timeout = 10000) {
    await this.waitForElement(page, selector, timeout);
    await page.fill(selector, text);
  }

  static async waitForPageReady(page) {
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  }
}

module.exports = WaitHelpers;