const BasePage = require('./base/BasePage');

class InteractionsPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.draggableElement = '#draggable';
    this.droppableTarget = '#droppable';
    this.droppableText = '#droppable p';
    
    this.sortableTab = '#demo-tab-list';
    this.sortableItems = '.vertical-list-container .list-group-item';
    
    this.selectableItems = '.list-group-item';
    
    this.resizableBox = '#resizableBoxWithRestriction';
    this.resizableHandle = '#resizableBoxWithRestriction .react-resizable-handle';
  }

  async openDragDrop() {
    await this.navigate('https://demoqa.com/droppable');
    //await this.closeAds();
  }

  async openSortable() {
    await this.navigate('https://demoqa.com/sortable');
    //await this.closeAds();
  }

  async openSelectable() {
    await this.navigate('https://demoqa.com/selectable');
    //await this.closeAds();
  }

  async openResizable() {
    await this.navigate('https://demoqa.com/resizable');
    //await this.closeAds();
  }

  async dragAndDropElement() {
    await this.dragAndDrop(this.draggableElement, this.droppableTarget);
    await this.waitForTimeout(5000);
  }

  async getDroppableText() {
    return await this.getText(this.droppableText);
  }

  async verifyElementDropped() {
    const text = await this.getDroppableText();
    console.log('Droppable text after drop:', text);
    return text === 'Dropped!';
  }

  async getDroppableBackgroundColor() {
    const element = await this.page.locator(this.droppableTarget);
    return await element.evaluate(el => window.getComputedStyle(el).backgroundColor);
  }

  async verifyDroppableColorChanged() {
    const bgColor = await this.getDroppableBackgroundColor();
    return bgColor === 'rgb(70, 130, 180)';
  }

  async dragElementTo(sourceSelector, targetSelector) {
    await this.dragAndDrop(sourceSelector, targetSelector);
  }

  async sortItems(fromIndex, toIndex) {
    const items = await this.page.locator(this.sortableItems).all();
    const sourceItem = items[fromIndex];
    const targetItem = items[toIndex];
    
    await sourceItem.dragTo(targetItem);
    await this.waitForTimeout(500);
  }

  async selectItem(index) {
    const items = await this.page.locator(this.selectableItems).all();
    await items[index].click();
  }

  async selectMultipleItems(indices) {
    for (const index of indices) {
      await this.selectItem(index);
    }
  }

  async isItemSelected(index) {
    const items = await this.page.locator(this.selectableItems).all();
    const classList = await items[index].getAttribute('class');
    return classList.includes('active');
  }

  async resizeBox(deltaX, deltaY) {
    const handle = await this.page.locator(this.resizableHandle);
    const box = await handle.boundingBox();
    
    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(box.x + box.width / 2 + deltaX, box.y + box.height / 2 + deltaY);
    await this.page.mouse.up();
    await this.waitForTimeout(500);
  }

  async getBoxDimensions() {
    const box = await this.page.locator(this.resizableBox);
    const boundingBox = await box.boundingBox();
    return {
      width: boundingBox.width,
      height: boundingBox.height
    };
  }
}

module.exports = InteractionsPage;