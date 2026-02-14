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

  test('Verify droppable area text changes after drop', async ({ interactionsPage }) => {
    const initialText = await interactionsPage.getDroppableText();
    expect(initialText).not.toBe('Dropped!');
    
    await interactionsPage.dragAndDropElement();
    
    const finalText = await interactionsPage.getDroppableText();
    expect(finalText).toBe('Dropped!');
  });

  

 
});