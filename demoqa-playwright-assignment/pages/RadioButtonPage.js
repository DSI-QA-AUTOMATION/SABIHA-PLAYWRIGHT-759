const BasePage = require('./base/BasePage');

class RadioButtonPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.yesRadio = 'label[for="yesRadio"]';
    this.impressiveRadio = 'label[for="impressiveRadio"]';
    this.noRadio = '#noRadio';
    this.resultText = '.text-success';
  }

  async open() {
    await this.navigate('https://demoqa.com/radio-button');
    await this.closeAds();
  }

  async selectYes() {
    await this.click(this.yesRadio);
  }

  async selectImpressive() {
    await this.click(this.impressiveRadio);
  }

  async isNoRadioDisabled() {
    return await this.page.isDisabled(this.noRadio);
  }

  async getResultText() {
    const isVisible = await this.isVisible(this.resultText);
    if (!isVisible) return '';
    return await this.getText(this.resultText);
  }

  async verifySelection(expectedText) {
    const result = await this.getResultText();
    return result === expectedText;
  }

  async verifyYesSelected() {
    return await this.verifySelection('Yes');
  }

  async verifyImpressiveSelected() {
    return await this.verifySelection('Impressive');
  }
}

module.exports = RadioButtonPage;