const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');


test.describe.configure({ mode: 'serial' });

test.describe('Tool Tips Tests', () => {
  test.beforeEach(async ({ widgetsPage }) => {
    await widgetsPage.openTooltips();
  });

  test('TC-12: Verify tooltip appears on hover', async ({ widgetsPage }) => {
    await widgetsPage.hoverTooltipButton();
    
    const isDisplayed = await widgetsPage.verifyTooltipDisplayed('hover');
    expect(isDisplayed).toBeTruthy();
  });

  

 
});