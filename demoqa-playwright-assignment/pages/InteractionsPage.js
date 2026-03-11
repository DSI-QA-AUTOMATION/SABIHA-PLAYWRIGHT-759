const { expect } = require('@playwright/test');
const BasePage = require('./base/BasePage');

class InteractionsPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.draggableElement = '#draggable';
    this.droppableTarget = '#droppable';
    this.droppableText = '#droppable p';

    this.containerTab = '#simpleDropContainer';
    
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
    // ensure that the simple droppable example is visible before attempting to drag
    const simpleTabPane = this.page.locator('#droppableExample-tabpane-simple');
    
const source = this.page.locator('#draggable');
const target = this.page.locator('#droppable').first();

// Wait for elements
await source.waitFor({ state: 'visible' });
await target.waitFor({ state: 'visible' });

// Scroll into view (VERY IMPORTANT)
await source.scrollIntoViewIfNeeded();
await target.scrollIntoViewIfNeeded();

// Get bounding boxes
const sourceBox = await source.boundingBox();
const targetBox = await target.boundingBox();

// Move mouse to source
await this.page.mouse.move(
  sourceBox.x + sourceBox.width / 2,
  sourceBox.y + sourceBox.height / 2
);

// Mouse down (pick element)
await this.page.mouse.down();

// Move mouse to target (with steps → very important)
await this.page.mouse.move(
  targetBox.x + targetBox.width / 2,
  targetBox.y + targetBox.height / 2,
  { steps: 25 }
);

// Drop element
await this.page.mouse.up();
  }

  async getDroppableText() {
    //return await this.getText(this.droppableText);
    await this.page.waitForSelector(this.droppableText, { timeout: 5000 });

    return await this.page.textContent(this.droppableText);
  }

  async verifyElementDropped() {
    const text = await this.getDroppableText();
    console.log('Droppable text after drop:', text);
    return text === 'Dropped!';
  }




  async dragElementTo(sourceSelector, targetSelector) {
    await this.dragAndDrop(sourceSelector, targetSelector);
  }

 




}

module.exports = InteractionsPage;