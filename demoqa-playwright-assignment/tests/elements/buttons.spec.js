const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Buttons Tests', () => {
  test.beforeEach(async ({ buttonsPage }) => {
    await buttonsPage.open();
  });

  test('TC-06: Verify all click actions', async ({ buttonsPage }) => {
    await buttonsPage.performAllClicks();
    
    const verification = await buttonsPage.verifyAllMessages();
    expect(verification.doubleClick).toBeTruthy();
    expect(verification.rightClick).toBeTruthy();
    expect(verification.dynamicClick).toBeTruthy();
  });

  test('Verify double click functionality', async ({ buttonsPage }) => {
    await buttonsPage.performDoubleClick();
    
    const message = await buttonsPage.getDoubleClickMessage();
    expect(message).toBe('You have done a double click');
  });

  test('Verify right click functionality', async ({ buttonsPage }) => {
    await buttonsPage.performRightClick();
    
    const message = await buttonsPage.getRightClickMessage();
    expect(message).toBe('You have done a right click');
  });

  test('Verify dynamic click functionality', async ({ buttonsPage }) => {
    await buttonsPage.performDynamicClick();
    
    const message = await buttonsPage.getDynamicClickMessage();
    expect(message).toBe('You have done a dynamic click');
  });

  
});