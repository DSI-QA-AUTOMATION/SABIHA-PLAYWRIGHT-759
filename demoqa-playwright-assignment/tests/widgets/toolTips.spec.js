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

  test('Verify tooltip text on button hover', async ({ widgetsPage }) => {
    await widgetsPage.hoverTooltipButton();
    
    const tooltipText = await widgetsPage.getTooltipText();
    expect(tooltipText).toBeTruthy();
    expect(tooltipText.length).toBeGreaterThan(0);
  });

  test('Verify tooltip on text field hover', async ({ widgetsPage }) => {
    await widgetsPage.hoverTooltipTextField();
    
    const isDisplayed = await widgetsPage.verifyTooltipDisplayed('text');
    expect(isDisplayed).toBeTruthy();
  });

  test('Verify tooltip appears and disappears', async ({ widgetsPage, page }) => {
    await widgetsPage.hoverTooltipButton();
    let isDisplayed = await widgetsPage.verifyTooltipDisplayed('hover');
    expect(isDisplayed).toBeTruthy();
    
    await page.mouse.move(0, 0);
    await page.waitForTimeout(1000);
  });
});