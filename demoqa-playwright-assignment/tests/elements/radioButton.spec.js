const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Radio Button Tests', () => {
  test.beforeEach(async ({ radioButtonPage }) => {
    await radioButtonPage.open();
  });

  test('TC-04: Select Yes radio button', async ({ radioButtonPage }) => {
    await radioButtonPage.selectYes();
    
    const result = await radioButtonPage.verifyYesSelected();
    expect(result).toBeTruthy();
    
    const resultText = await radioButtonPage.getResultText();
    expect(resultText).toBe('Yes');
  });



  test('Verify No radio button is disabled', async ({ radioButtonPage }) => {
    const isDisabled = await radioButtonPage.isNoRadioDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('Verify radio button selection changes', async ({ radioButtonPage }) => {
    await radioButtonPage.selectYes();
    let result = await radioButtonPage.getResultText();
    expect(result).toBe('Yes');
    
    await radioButtonPage.selectImpressive();
    result = await radioButtonPage.getResultText();
    expect(result).toBe('Impressive');
  });
});