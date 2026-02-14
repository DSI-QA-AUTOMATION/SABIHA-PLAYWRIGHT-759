const BasePage = require('./base/BasePage');

class LinksPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.homeLink = '#simpleLink';
    this.dynamicHomeLink = '#dynamicLink';
    this.createdLink = '#created';
    this.noContentLink = '#no-content';
    this.movedLink = '#moved';
    this.badRequestLink = '#bad-request';
    this.unauthorizedLink = '#unauthorized';
    this.forbiddenLink = '#forbidden';
    this.notFoundLink = '#invalid-url';
    
    this.linkResponse = '#linkResponse';
  }

  async open() {
    await this.navigate('https://demoqa.com/links');
    await this.closeAds();
  }

  async clickHomeLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.click(this.homeLink)
    ]);
    return newPage;
  }

  async clickDynamicHomeLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.click(this.dynamicHomeLink)
    ]);
    return newPage;
  }

  async clickApiLink(linkSelector) {
    await this.click(linkSelector);
    await this.waitForTimeout(1000);
  }

  async clickCreatedLink() {
    await this.clickApiLink(this.createdLink);
  }

  async clickNoContentLink() {
    await this.clickApiLink(this.noContentLink);
  }

  async clickMovedLink() {
    await this.clickApiLink(this.movedLink);
  }

  async clickBadRequestLink() {
    await this.clickApiLink(this.badRequestLink);
  }

  async clickUnauthorizedLink() {
    await this.clickApiLink(this.unauthorizedLink);
  }

  async clickForbiddenLink() {
    await this.clickApiLink(this.forbiddenLink);
  }

  async clickNotFoundLink() {
    await this.clickApiLink(this.notFoundLink);
  }

  async getLinkResponse() {
    const isVisible = await this.isVisible(this.linkResponse);
    if (!isVisible) return '';
    return await this.getText(this.linkResponse);
  }

  async verifyLinkResponse(expectedStatus) {
    const response = await this.getLinkResponse();
    return response.includes(expectedStatus);
  }

  async verifyNewTabOpened(newPage, expectedUrl) {
    await newPage.waitForLoadState();
    const url = newPage.url();
    await newPage.close();
    return url.includes(expectedUrl);
  }
}

module.exports = LinksPage;