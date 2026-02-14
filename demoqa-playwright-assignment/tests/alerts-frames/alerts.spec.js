const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Alerts Tests', () => {
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.open();
  });

  test('TC-10: Handle simple alert', async ({ alertsPage }) => {
    const alertMessage = await alertsPage.clickSimpleAlert();
    
    expect(alertMessage).toBeTruthy();
    expect(alertMessage.length).toBeGreaterThan(0);
  });

  test('Verify timer alert appears after delay', async ({ alertsPage }) => {
    const alertMessage = await alertsPage.clickTimerAlert();
    
    expect(alertMessage).toBeTruthy();
    expect(alertMessage).toContain('appeared');
  });

  test('Verify confirm alert with OK', async ({ alertsPage }) => {
    await alertsPage.clickConfirmAlert(true);
    
    const result = await alertsPage.verifyConfirmResult(true);
    expect(result).toBeTruthy();
    
    const confirmText = await alertsPage.getConfirmResult();
    expect(confirmText).toBe('You selected Ok');
  });

  test('Verify confirm alert with Cancel', async ({ alertsPage }) => {
    await alertsPage.clickConfirmAlert(false);
    
    const result = await alertsPage.verifyConfirmResult(false);
    expect(result).toBeTruthy();
    
    const confirmText = await alertsPage.getConfirmResult();
    expect(confirmText).toBe('You selected Cancel');
  });

  test('Verify prompt alert with input', async ({ alertsPage }) => {
    const inputText = 'Test User Name';
    await alertsPage.clickPromptAlert(inputText);
    
    const result = await alertsPage.verifyPromptResult(inputText);
    expect(result).toBeTruthy();
    
    const promptText = await alertsPage.getPromptResult();
    expect(promptText).toContain(inputText);
  });

  test('Verify prompt alert dismissal', async ({ alertsPage }) => {
    await alertsPage.clickPromptAlert('');
    
    const promptText = await alertsPage.getPromptResult();
    expect(promptText).toBe('');
  });
});