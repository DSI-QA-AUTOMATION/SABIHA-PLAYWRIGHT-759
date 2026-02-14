const BasePage = require('./base/BasePage');

class AlertsPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.simpleAlertButton = '#alertButton';
    this.timerAlertButton = '#timerAlertButton';
    this.confirmAlertButton = '#confirmButton';
    this.promptAlertButton = '#promtButton';
    
    this.confirmResult = '#confirmResult';
    this.promptResult = '#promptResult';
  }

  async open() {
    await this.navigate('https://demoqa.com/alerts');
    //await this.closeAds();
  }

  async clickSimpleAlert() {
    let alertMessage = '';
    
    this.page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    
    await this.click(this.simpleAlertButton);
    await this.waitForTimeout(500);
    
    return alertMessage;
  }

  async clickTimerAlert() {
    let alertMessage = '';
    
    this.page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    
    await this.click(this.timerAlertButton);
    await this.waitForTimeout(6000);
    
    return alertMessage;
  }

  async clickConfirmAlert(accept = true) {
    this.page.once('dialog', async dialog => {
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    
    await this.click(this.confirmAlertButton);
    await this.waitForTimeout(500);
  }

  async clickPromptAlert(inputText = '') {
    this.page.once('dialog', async dialog => {
      if (inputText) {
        await dialog.accept(inputText);
      } else {
        await dialog.dismiss();
      }
    });
    
    await this.click(this.promptAlertButton);
    await this.waitForTimeout(500);
  }

  async getConfirmResult() {
    const isVisible = await this.isVisible(this.confirmResult);
    if (!isVisible) return '';
    return await this.getText(this.confirmResult);
  }

  async getPromptResult() {
    const isVisible = await this.isVisible(this.promptResult);
    if (!isVisible) return '';
    return await this.getText(this.promptResult);
  }

  async verifyConfirmResult(accepted) {
    const result = await this.getConfirmResult();
    const expectedText = accepted ? 'You selected Ok' : 'You selected Cancel';
    return result === expectedText;
  }

  async verifyPromptResult(inputText) {
    const result = await this.getPromptResult();
    return result.includes(inputText);
  }
}

module.exports = AlertsPage;