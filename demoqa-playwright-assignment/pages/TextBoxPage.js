const BasePage = require('./base/BasePage');

class TextBoxPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.fullNameInput = '#userName';
    this.emailInput = '#userEmail';
    this.currentAddressInput = '#currentAddress';
    this.permanentAddressInput = '#permanentAddress';
    this.submitButton = '#submit';
    
    this.outputSection = '#output';
    this.outputName = '#name';
    this.outputEmail = '#email';
    this.outputCurrentAddress = '#currentAddress.mb-1';
    this.outputPermanentAddress = '#permanentAddress.mb-1';
  }

  async open() {
    await this.navigate('https://demoqa.com/text-box');
    //await this.closeAds();
  }

  async fillTextBox(userData) {
    await this.clearAndFill(this.fullNameInput, userData.fullName);
    await this.clearAndFill(this.emailInput, userData.email);
    await this.clearAndFill(this.currentAddressInput, userData.currentAddress);
    await this.clearAndFill(this.permanentAddressInput, userData.permanentAddress);
  }

  async clickSubmit() {
    await this.scrollToElement(this.submitButton);
    await this.click(this.submitButton);
  }

  async submitForm(userData) {
    await this.fillTextBox(userData);
    await this.clickSubmit();
  }

  async isOutputVisible() {
    return await this.isVisible(this.outputSection);
  }

  async getOutputText() {
    return {
      name: await this.getText(this.outputName),
      email: await this.getText(this.outputEmail),
      currentAddress: await this.getText(this.outputCurrentAddress),
      permanentAddress: await this.getText(this.outputPermanentAddress)
    };
  }

  async verifyOutput(expectedData) {
    const output = await this.getOutputText();
    return {
      nameMatches: output.name.includes(expectedData.fullName),
      emailMatches: output.email.includes(expectedData.email),
      currentAddressMatches: output.currentAddress.includes(expectedData.currentAddress),
      permanentAddressMatches: output.permanentAddress.includes(expectedData.permanentAddress)
    };
  }
}

module.exports = TextBoxPage;