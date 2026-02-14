const BasePage = require('./base/BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    this.categoryCards = {
      elements: '.card:has-text("Elements")',
      forms: '.card:has-text("Forms")',
      alertsFrameWindows: '.card:has-text("Alerts, Frame & Windows")',
      widgets: '.card:has-text("Widgets")',
      interactions: '.card:has-text("Interactions")',
      bookStore: '.card:has-text("Book Store Application")'
    };
    
    this.header = '.main-header';
    this.banner = '.home-banner';
  }

  async open() {
    await this.navigate('/');
    await this.closeAds();
  }

  async clickCategory(categoryName) {
    const selector = this.categoryCards[categoryName];
    await this.scrollToElement(selector);
    await this.click(selector);
  }

  async verifyCategoryVisible(categoryName) {
    const selector = this.categoryCards[categoryName];
    return await this.isVisible(selector);
  }

  async verifyAllCategoriesVisible() {
    const categories = Object.keys(this.categoryCards);
    const results = {};
    
    for (const category of categories) {
      results[category] = await this.verifyCategoryVisible(category);
    }
    
    return results;
  }

  async getCategoryText(categoryName) {
    const selector = this.categoryCards[categoryName];
    return await this.getText(selector);
  }

  async isHomePageLoaded() {
    await this.waitForSelector(this.header);
    return await this.isVisible(this.banner);
  }
}

module.exports = HomePage;