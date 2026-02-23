const { test } = require('../../fixtures/testFixtures');
const { expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test.describe('Check Box Tests', () => {
  test.beforeEach(async ({ checkBoxPage }) => {
    await checkBoxPage.open();
  });

  test('TC-03: Select multiple checkboxes', async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    
     const checkboxes = ['Desktop', 'Documents', 'Downloads'];
    await checkBoxPage.selectMultipleCheckboxes(checkboxes);
    
    const verification = await checkBoxPage.verifyMultipleCheckboxesSelected(checkboxes);
    expect(verification.Desktop).toBeTruthy();
    expect(verification.Documents).toBeTruthy();
    expect(verification.Downloads).toBeTruthy();
  });

  test('Verify checkbox selection result is displayed', async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.selectCheckboxByLabel('Notes');
    
    const result = await checkBoxPage.getResultText();
    expect(result).toContain('notes');
  });

 
});