const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Drag and Drop Tests', () => {
  test.beforeEach(async ({ interactionsPage }) => {
    await interactionsPage.openDragDrop();
  });

  test('TC-14: Drag and drop element successfully', async ({ interactionsPage }) => {
    await interactionsPage.dragAndDropElement();
    
    const isDropped = await interactionsPage.verifyElementDropped();
    expect(isDropped).toBeTruthy();
    
    const text = await interactionsPage.getDroppableText();
    expect(text).toBe('Dropped!');
  });



  

 
});