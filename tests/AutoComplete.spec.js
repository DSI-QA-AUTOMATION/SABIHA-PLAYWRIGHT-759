import { test, expect } from '@playwright/test';

//we need to freeze the page by turning on the debugger from selectors hub

test('testing auto and hidden dropdown', async ({ page }) => {
  await page.goto('https://demoqa.com/auto-complete');
  await page.locator('.auto-complete__value-container').first().click();
  await page.locator('#autoCompleteMultipleInput').fill('Red');
  await page.locator('#react-select-2-option-0').click();
  await page.waitForTimeout(2000)
  await page.locator('.auto-complete__control.css-yk16xz-control > .auto-complete__value-container').click();
  await page.locator('#autoCompleteSingleInput').fill('Green');
  await page.locator('#autoCompleteSingleInput').press('Enter');
});