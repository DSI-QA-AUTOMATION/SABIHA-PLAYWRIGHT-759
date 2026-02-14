const BasePage = require('./base/BasePage');

class CheckBoxPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.expandAllButton = 'button[title="Expand all"]';
    this.collapseAllButton = 'button[title="Collapse all"]';
    this.homeToggle = '.rct-icon-expand-close';
    this.checkboxLabel = '.rct-title';
    this.resultText = '#result';
  }

  async open() {
    await this.navigate('https://demoqa.com/checkbox');
    //await this.closeAds();
  }

  async expandAll() {
    await this.click(this.expandAllButton);
    await this.waitForTimeout(500);
  }

  async collapseAll() {
    await this.click(this.collapseAllButton);
  }

  async selectCheckboxByLabel(label) {
    const checkbox = `//span[@class='rct-title'][contains(text(),'${label}')]`;
    await this.scrollToElement(checkbox);
    await this.click(checkbox);
  }

  async selectMultipleCheckboxes(labels) {
    for (const label of labels) {
      await this.selectCheckboxByLabel(label);
    }
  }

  async getResultText() {
    const isVisible = await this.isVisible(this.resultText);
    if (!isVisible) return '';
    return await this.getText(this.resultText);
  }

  async verifyCheckboxSelected(label) {
    const result = await this.getResultText();
    return result.toLowerCase().includes(label.toLowerCase());
  }

  async verifyMultipleCheckboxesSelected(labels) {
    const results = {};
    const resultText = await this.getResultText();
    
    for (const label of labels) {
      results[label] = resultText.toLowerCase().includes(label.toLowerCase());
    }
    
    return results;
  }

  async isCheckboxChecked(label) {
    const checkbox = `//span[@class='rct-title'][contains(text(),'${label}')]/ancestor::label//input`;
    return await this.page.isChecked(checkbox);
  }
}

module.exports = CheckBoxPage;