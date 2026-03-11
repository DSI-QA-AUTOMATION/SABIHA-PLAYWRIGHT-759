const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Drag and Drop Tests', () => {
  test.beforeEach(async ({ interactionsPage }) => {
    await interactionsPage.openDragDrop();
    await interactionsPage.waitForTimeout(2000);
  });

  test('TC-14: Drag and drop element successfully', async ({ interactionsPage }) => {
    await interactionsPage.dragAndDropElement();
    
    const text = await interactionsPage.getDroppableText();
    expect(text).toBe('Dropped!');
  });



  

 
});