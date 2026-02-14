const BasePage = require('./base/BasePage');

class ButtonsPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.doubleClickButton = '#doubleClickBtn';
    this.rightClickButton = '#rightClickBtn';
    this.dynamicClickButton = '//button[text()="Click Me"]';
    
    this.doubleClickMessage = '#doubleClickMessage';
    this.rightClickMessage = '#rightClickMessage';
    this.dynamicClickMessage = '#dynamicClickMessage';
  }

  async open() {
    await this.navigate('https://demoqa.com/buttons');
    //await this.closeAds();
  }

  async performDoubleClick() {
    await this.doubleClick(this.doubleClickButton);
  }

  async performRightClick() {
    await this.rightClick(this.rightClickButton);
  }

  async performDynamicClick() {
    await this.click(this.dynamicClickButton);
  }

  async getDoubleClickMessage() {
    const isVisible = await this.isVisible(this.doubleClickMessage);
    if (!isVisible) return '';
    return await this.getText(this.doubleClickMessage);
  }

  async getRightClickMessage() {
    const isVisible = await this.isVisible(this.rightClickMessage);
    if (!isVisible) return '';
    return await this.getText(this.rightClickMessage);
  }

  async getDynamicClickMessage() {
    const isVisible = await this.isVisible(this.dynamicClickMessage);
    if (!isVisible) return '';
    return await this.getText(this.dynamicClickMessage);
  }

  async verifyDoubleClickMessage() {
    const message = await this.getDoubleClickMessage();
    return message === 'You have done a double click';
  }

  async verifyRightClickMessage() {
    const message = await this.getRightClickMessage();
    return message === 'You have done a right click';
  }

  async verifyDynamicClickMessage() {
    const message = await this.getDynamicClickMessage();
    return message === 'You have done a dynamic click';
  }

  async performAllClicks() {
    await this.performDoubleClick();
    await this.performRightClick();
    await this.performDynamicClick();
  }

  async verifyAllMessages() {
    return {
      doubleClick: await this.verifyDoubleClickMessage(),
      rightClick: await this.verifyRightClickMessage(),
      dynamicClick: await this.verifyDynamicClickMessage()
    };
  }
}

module.exports = ButtonsPage;